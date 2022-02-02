<?php

    include 'short-init.php';

    if(class_exists( 'DraftLiveSync' )){

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

        $domain = $_POST['domain'];
        $target = $_POST['target'];
        $id = $_POST['id'];

        $query = <<<'GRAPHQL'
            mutation deleteResource(
                $target: String!
                $siteId: String!
                $userInfo: String!
                $externalId: String
            ) {
                deleteResource (
                    target: $target
                    siteId: $siteId
                    userInfo: $userInfo
                    externalId: $externalId
                ) {
                    success
                }
            }
        GRAPHQL;

        $variables = array(
            'externalId' => $id,
            'userInfo' => strval($user->ID),
            'siteId' => 'domain-settings',
            'target' => 'domain-settings',
        );

        try {

            $result = graphql_query($draft_live_sync->content_host, $query, $variables);

            echo json_encode($result);

        } catch (Exception $e) {
            echo json_encode($e);
        }

        //Don't forget to always exit in the ajax function.
        exit();

    } else {
        error_log('DLS CLASS DOES NOT EXIST!!!!');
    }
