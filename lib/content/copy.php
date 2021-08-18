<?php

trait CopyTrait {

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

        $result = graphql_query('http://content/graphql', $query, $variables);

        return $result;
    }
}
