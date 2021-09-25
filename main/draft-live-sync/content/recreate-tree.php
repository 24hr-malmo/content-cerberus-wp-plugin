<?php

trait RecreateTreeTrait {

    /**
     * Replace with graphql recreate tree
     */
    function recreate_tree($target) {

        $this->check_site_id();

        $user = new stdclass();

        // In case we load this with short init?
        if ( function_exists( 'wp_get_current_user' ) ) {
            $user = wp_get_current_user();
        }

        error_log('--- recreate_tree --- siteId: ' . $this->site_id . ' target: ' . $target);

        $variables = array(
            'target' => $target,
            'userInfo' => strval($user->ID),
            'siteId' => $this->site_id,
        );

        $query = <<<'GRAPHQL'
            mutation recreateResourceTree(
                $target: String!
                $userInfo: String!
                $siteId: String!
            ) {
                recreateResourceTree (
                    target: $target
                    siteId: $siteId
                    userInfo: $userInfo
            ) {
                success
            }
        }
        GRAPHQL;

        $result = graphql_query($this->content_host, $query, $variables);

        return $result;

    }

}
