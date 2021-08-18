<?php

    include 'short-init.php';

    require_once( '../lib/draft-live-sync-class.php' );

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

        $variables = array(
            'target' => 'domain-settings',
            'userInfo' => strval($user->ID),
            'siteId' => 'domain-settings',
            'resource' => array(
                'key' => $domain,
                'externalId' => $id,
                'type' => 'domain-setting',
                'content' => array(
                    'target' => $target,
                    'siteId' => $draft_live_sync->get_site_id(),
                    'domain' => $domain,
                ),
                'host' => 'wordpress',
            ),
        );

        error_log(print_r($variables, true));

        $query = <<<'GRAPHQL'
            mutation upsertResource(
                $target: String!
                $userInfo: String!
                $resource: ResourceInstance!
                $siteId: String!
            ) {
                upsertResource (
                    target: $target
                    siteId: $siteId
                    userInfo: $userInfo
                    host: "wordpress"
                    resource: $resource
            ) {
                success
            }
        }
        GRAPHQL;

        try {

            $result = graphql_query($draft_live_sync->content_host, $query, $variables);

            echo json_encode($result);

        } catch (Exception $e) {

        }

        //Don't forget to always exit in the ajax function.
        exit();

    } else {
        error_log('DLS CLASS DOES NOT EXIST!!!!');
    }
