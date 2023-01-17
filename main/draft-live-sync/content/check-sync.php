<?php

trait CheckSyncTrait {

    public function check_sync($permalink) {

        $this->check_site_id();

        $data = new stdclass();

        $permalink = $this->cleanup_permalink($permalink);

        error_log('--- check_sync --- $permalink: ' . $permalink);

        // Fetch all data from the page
        $content = $this->get_content($permalink);

        if ($content->payload == '404' || empty($content->payload)) {
            error_log('--- check-sync --- Couldn\'t find content with $permalink: ' . $permalink);
            return;
        }

        $externalId = isset($content->payload->externalId) ? $content->payload->externalId : $content->payload->guid;
        if (!$externalId) {
            return;
        }

        $query = <<<'GRAPHQL'
            query resourceStatus(
                $siteId: String!
                $targets: [String]!
                $resource: ResourceInstance!
            ) {
                resourceStatus (
                    siteId: $siteId
                    targets: $targets
                    resource: $resource
                ) {
                    target
                    synced
                    comparedTo
                    diff
                    exists
                }
            }
        GRAPHQL;


        $variables = array(
            'siteId' => $this->site_id,
            'targets' => array('draft', 'live'),
            'resource' => array(
                'key' => $permalink,
                'externalId' => $externalId,
                'type' => $content->payload->type,
                'parentId' => strval($content->payload->parentId),
                'order' => isset($content->payload->order) ? $content->payload->order : -1,
                'content' => $content->payload,
                'host' => 'wordpress',
                'tags' => isset($content->payload->tags) ? $content->payload->tags : [],
            ),
        );

        $result = graphql_query($this->content_host, $query, $variables);

        /**
         * 
         * If we detect "dynamic" blocks (blocks that autopopulate using a reference, e.g. reusable blocks) in the content, loop through content recursively.
         * For every "dynamic" block we find, run check_sync on that reference/permalink.
         * 
         * If we ever find that the data is not synced, exit the loop and
         *      loop through result.data.resourceStatus objects (itemStatus) and find the one where (itemStatus.target === 'live' && itemStatus.comparedTo === 'draft'),
         *      and change that itemStatus.synced to false
         * 
         * All this does is make the publish button clickable, and if we can click it then the code will copy from draft to live
         * 
         */

        $synced = true;
        $this->check_nested_sync_status($content->payload->blocks, $synced);

        if (!$synced) {
            $result['data']['resourceStatus'][2]['synced'] = false;
        }

        $result = apply_filters('cerberus_check_sync', $result, $this->site_id, $content->payload->id);

        return $result;

    }

    private function check_nested_sync_status($blocks, &$isSynced) {
        foreach ($blocks as $block) {

            $innerBlocks = $block->blocks ?? null;

            if ($innerBlocks) {
                $this->check_nested_sync_status($innerBlocks, $isSynced);
            }

            if ($block->__reference) {
                $innerSyncResults = $this->check_sync($block->__reference);

                foreach ($innerSyncResults['data']['resourceStatus'] as $itemStatus) {

                    if ($itemStatus['target'] === 'live' && $itemStatus['comparedTo'] === 'draft') {

                        if (($block->blockName === 'core/block') && ($itemStatus['synced'] === false)) {
                            $isSynced = false;
                        }
                    }
                }
            }
        }
    }
}
