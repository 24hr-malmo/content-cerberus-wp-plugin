<?php

    include 'short-init.php';

    require_once( '../lib/draft-live-sync-class.php' );

    if(class_exists( 'DraftLiveSync' )){

        // Init or use instance of the manager.
        $dir = dirname( __FILE__ );
        $content_host = getenv('CONTENT_HOST');
        $api_token = getenv('API_TOKEN');

        $draft_live_sync = new DraftLiveSync($dir, 'ajax-version', $content_host, $api_token, true);

        $query = <<<'GRAPHQL'
            query resources(
                $siteId: String!
                $target: String!
            ) {
                resources (
                    siteId: $siteId
                    target: $target
                ) {
                    key
                    externalId
                    content
                }
            }
        GRAPHQL;

        $variables = array(
            'siteId' => 'domain-settings',
            'target' => 'domain-settings',
        );

        try {

            $result = graphql_query($draft_live_sync->content_host, $query, $variables);

            // TODO: FILTER SO ONLY THE CORRECT ENTRIES WITH THE SAME SITEIDS ARE RETURNED
            // $draft_live_sync->get_site_id(),

            echo json_encode($result);

        } catch (Exception $e) {

        }

        //Don't forget to always exit in the ajax function.
        exit();

    } else {
        error_log('DLS CLASS DOES NOT EXIST!!!!');
    }
