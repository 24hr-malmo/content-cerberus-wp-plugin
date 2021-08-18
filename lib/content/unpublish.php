<?php

trait UnpublishTrait {

    public function unpublish($target, $id = '', $key = '') {

        $user = new stdclass();

        // In case we load this with short init?
        if ( function_exists( 'wp_get_current_user' ) ) {
            $user = wp_get_current_user();
        }

        $query = <<<'GRAPHQL'
            mutation deleteResource(
                $target: String!
                $siteId: String!
                $userInfo: String!
                $externalId: String
                $key: String
            ) {
                deleteResource (
                    target: $target
                    siteId: $siteId
                    userInfo: $userInfo
                    externalId: $externalId
                    key: $key
                ) {
                    success
                }
            }
        GRAPHQL;

        $variables = array(
            'target' => $target,
            'externalId' => strval($id),
            'key' => $key,
            'userInfo' => strval($user->ID),
            'siteId' => $this->site_id,
        );

        $response = graphql_query('http://content/graphql', $query, $variables);

        return $response;
    }

}

