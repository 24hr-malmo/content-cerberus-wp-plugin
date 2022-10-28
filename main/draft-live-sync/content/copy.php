<?php

trait CopyTrait {

    private function publish_reusable_blocks($content, $from_target, $to_target) {

        if (array_key_exists('blocks', $content)) {

            foreach ($content['blocks'] as $block) {

                // echo $to_target . '-' . $from_target . ' -> ' . $block['blockName']; //  . ' - ' . $block['permalink'] . "\n";
                if ($block['blockName'] == 'core/block') {
                    $this->copy($from_target, $to_target, $block['__reference']);
                }

                $this->publish_reusable_blocks($block, $from_target, $to_target);

            }

        }

    }

    public function copy($from_target, $to_target, $permalink = '') {

        $permalink = $this->cleanup_permalink($permalink);

        $content = $this->get_content($permalink);

        if ($content->payload == '404' || empty($content->payload)) {
            error_log('--- copy --- Couldn\'t find content with $permalink: ' . $permalink);
            return;
        }

        $user = new stdclass();

        // In case we load this with short init?
        if ( function_exists( 'wp_get_current_user' ) ) {
            $user = wp_get_current_user();
        }

        $variables = array(
            'fromTarget' => $from_target,
            'toTarget' => $to_target,
            'userInfo' => strval($user->ID),
            'siteId' => $this->site_id,
            'externalId' => isset($content->payload->externalId) ? $content->payload->externalId : $content->payload->guid,
        );

        $query = <<<'GRAPHQL'
            mutation copyResource(
                $fromTarget: String!
                $toTarget: String!
                $userInfo: String!
                $externalId: String!
                $siteId: String!
            ) {
                copyResource (
                    toTarget: $toTarget
                    fromTarget: $fromTarget
                    siteId: $siteId
                    userInfo: $userInfo
                    externalId: $externalId
            ) {
                success
            }
        }
        GRAPHQL;

        $result = graphql_query($this->content_host, $query, $variables);
        $result = apply_filters('cerberus_copy', $result, $from_target, $to_target, $permalink);

        if ($to_target == 'live') {
            $live_content = $this->get_resource_from_content($permalink, $to_target);
            $page_content = $live_content['data']['resource']['content'];
            $this->publish_reusable_blocks($page_content, $from_target, $to_target);
            // echo json_encode($page_content);
        }

        return $result;

    }

}
