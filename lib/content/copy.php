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

        // Fetch all data from the page
        $permalink = $this->replace_hosts($permalink);
        // remove trailing slash, but keep single slash which is the start page permalink
        $permalink = preg_replace('/(.)\/$/', '$1', $permalink);

        $content = $this->get_content($permalink);

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
            'externalId' => $content->payload->guid,
        );

        error_log(print_r($variables, true));

        if ($to_target == 'live') {
            $live_content = $this->get_resource_from_content($permalink, $to_target);
            $page_content = $live_content['data']['resource']['content'];
            $this->publish_reusable_blocks($page_content, $from_target, $to_target);
            // echo json_encode($page_content);
        }

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

        return $result;

    }

}
