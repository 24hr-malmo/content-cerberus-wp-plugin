<?php

    include 'short-init.php';


    if(class_exists( 'DraftLiveSync' )){

        global $current_site;

        // Init or use instance of the manager.
        $dir = dirname( __FILE__ );
        $content_host = getenv('CONTENT_HOST');
        $api_token = getenv('API_TOKEN');

        $draft_live_sync = new DraftLiveSync($dir, 'ajax-version', $content_host, $api_token, true);

        $domain = $_POST['domain'];
        $target = $_POST['target'];
        $id = $_POST['id'];
        $site_name = $current_site['site_name'];

        $query = <<<'GRAPHQL'
            mutation triggerEvent(
                $event: String!
                $service: String!
                $payload: EventPayloadData!
            ) {
                triggerEvent (
                    event: $event,
                    service: $service,
                    payload: $payload,
                ) {
                    success
                }
            }
        GRAPHQL;

        $variables = array(
            'event' => 'domain-sync',
            'service' => 'wordpress',
            'payload' => array(
                'siteName' => $site_name,
                'siteId' => $draft_live_sync->get_site_id(),
            )
        );

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
