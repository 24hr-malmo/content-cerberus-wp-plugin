<?php

trait UnpublishTrait {

    public function unpublish($target, $id = '', $key = '') {

        $user = new stdclass();

        error_log('--- unpublishing ' . $id . ' with key "' . $key . '" from ' . $target);

        // In case we load this with short init?
        if ( function_exists( 'wp_get_current_user' ) ) {
            $user = wp_get_current_user();
        }

        // Getting the post id.
        // Note that the id passed into this (unpublish) function is not defined.
        // I don't want to change the code more than enough.
        // The graphql request uses key (and not id).
        // But for the apply_filters I need the id.
        $permalink = $this->cleanup_permalink($key);
        $content = $this->get_content($permalink);

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
            'externalId' => empty($post_type) ? strval($id) : $post_type . '-' . $id,
            'key' => $key,
            'userInfo' => strval($user->ID),
            'siteId' => $this->site_id,
        );

        $response = graphql_query($this->content_host, $query, $variables);
        $response = apply_filters('cerberus_unpublish', $response, $target, $content->payload->id, $key);

        return $response;
    }

}

