<?php

include 'short-init.php';

if(class_exists( 'DraftLiveSync' )){

    error_log('-- api/get-publication-requests');

    // Init or use instance of the manager.
    $dir = dirname( __FILE__ );
    $content_host = getenv('CONTENT_HOST');
    $api_token = getenv('API_TOKEN');

    $draft_live_sync = new DraftLiveSync($dir, 'ajax-version', $content_host, $api_token, true);

    $query = <<<'GRAPHQL'
        query resources(
            $siteId: String!
            $target: String!
            $limit: Int
            $order: ResourceOrder
        ) {
            resources (
                siteId: $siteId
                target: $target
                limit: $limit
                order: $order
            ) {
                key
                externalId
                content
                tags
            }
        }
    GRAPHQL;

    $variables = array(
        'siteId' => 'publication-requests',
        'target' => 'publication-requests',
        'limit' => 2000,
        'order' => 'DESC',
    );

    try {

        $result = graphql_query($draft_live_sync->content_host, $query, $variables);

        $resources = new stdClass();
        $resources->data = new stdClass();
        $resources->data->resources = array_values($result['data']['resources']);

        echo json_encode($resources);

    } catch (Exception $e) {
        error_log('-- Error getting all publication requests --' . json_encode($e));
    }

    //Don't forget to always exit in the ajax function.
    exit();

} else {
    error_log('DLS CLASS DOES NOT EXIST!!!!');
}
