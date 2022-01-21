<?php

trait CheckSyncTrait {

    public function check_sync($permalink) {

        error_log('--- check_sync --- $permalink: ' . $permalink);

        $this->check_site_id();

        $data = new stdclass();

        $permalink = $this->replace_hosts($permalink);
        // remove trailing slash, but keep single slash which is the start page permalink
        $permalink = preg_replace('/(.)\/$/', '$1', $permalink);

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
            ),
        );

        $result = graphql_query($this->content_host, $query, $variables);

        return $result;

    }
}
