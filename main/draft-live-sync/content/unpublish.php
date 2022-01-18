<?php

trait UnpublishTrait {

    public function unpublish($target, $id = '', $key = '') {

        $user = new stdclass();

        // In case we load this with short init?
        if ( function_exists( 'wp_get_current_user' ) ) {
            $user = wp_get_current_user();
        }

        $post = get_post($id);

        $post_type = $post->post_type;

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
            'externalId' => empty($post_type) ? $id : $post_type . '-' . $id,
            'key' => $key,
            'userInfo' => strval($user->ID),
            'siteId' => $this->site_id,
        );

        $response = graphql_query($this->content_host, $query, $variables);

        return $response;
    }

}

