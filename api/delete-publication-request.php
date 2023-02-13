<?php

    include 'short-init.php';

    if(class_exists( 'DraftLiveSync' )){

        error_log('-- api/delete-publication-request');

        // Init or use instance of the manager.
        $dir = dirname( __FILE__ );
        $content_host = getenv('CONTENT_HOST');
        $api_token = getenv('API_TOKEN');

        $draft_live_sync = new DraftLiveSync($dir, 'ajax-version', $content_host, $api_token, true);

        $user = new stdclass();

        // In case we load this with short init?
        if ( function_exists( 'wp_get_current_user' ) ) {
            $user = wp_get_current_user();
        }

        $permalink = $_POST['permalink'];
        $post = $draft_live_sync->get_content($permalink);

        $query = <<<'GRAPHQL'
            mutation deleteResource(
                $userInfo: String!
                $externalId: String
            ) {
                deleteResource (
                    target: "publication-requests"
                    siteId: "publication-requests"
                    userInfo: $userInfo
                    externalId: $externalId
                ) {
                    success
                }
            }
        GRAPHQL;

        $variables = array(
            'externalId' => 'publication-request-' . $post->payload->id,
            'userInfo' => strval($user->ID),
        );

        try {
            $result = graphql_query($draft_live_sync->content_host, $query, $variables);
            echo json_encode($result);

        } catch (Exception $e) {
            error_log('-- Error deleting publication request --' . json_encode($e));
        }

        //Don't forget to always exit in the ajax function.
        exit();

    } else {
        error_log('DLS CLASS DOES NOT EXIST!!!!');
    }
