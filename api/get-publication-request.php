<?php

include 'short-init.php';

if(class_exists( 'DraftLiveSync' )){

    error_log('-- api/get-publication-request');

    // Init or use instance of the manager.
    $dir = dirname( __FILE__ );
    $content_host = getenv('CONTENT_HOST');
    $api_token = getenv('API_TOKEN');

    $draft_live_sync = new DraftLiveSync($dir, 'ajax-version', $content_host, $api_token, true);
    
    $externalId = 'publication-request-' . $_POST['postId'] . '-site-id-' . $draft_live_sync->get_site_id();

    $query = <<<'GRAPHQL'
        query getResource(
            $siteId: String!
            $target: String!
            $externalId: String!
        ) {
            resource (
                siteId: $siteId
                target: $target
                externalId: $externalId
            ) {
                content
                tags
            }
        }
    GRAPHQL;

    $variables = array(
        'siteId' => 'publication-requests',
        'target' => 'publication-requests',
        'externalId' => $externalId,
    );

    try {
        $result = graphql_query($draft_live_sync->content_host, $query, $variables);
        echo json_encode($result);

    } catch (Exception $e) {
        error_log('-- Error getting publication request --' . json_encode($e));
    }

    //Don't forget to always exit in the ajax function.
    exit();

} else {
    error_log('DLS CLASS DOES NOT EXIST!!!!');
}
