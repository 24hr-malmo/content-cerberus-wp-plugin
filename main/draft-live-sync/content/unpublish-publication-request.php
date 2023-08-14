<?php

trait UnpublishPublicationRequestTrait {

    public function unpublishPublicationRequest($id = '') {

        $user = new stdclass();

        error_log('--- unpublishing-publication-request ' . $id);

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
            'target' => 'publication-requests',
            'externalId' => 'publication-request-' . $id,
            'key' => '',
            'userInfo' => strval($user->ID),
            'siteId' => 'publication-requests',
        );

        $response = graphql_query($this->content_host, $query, $variables);
        $response = apply_filters('cerberus_unpublish', $response, $target, $content->payload->id, $key);

        return $response;
    }

}

