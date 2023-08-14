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
        ) {
            resources (
                siteId: $siteId
                target: $target
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
    );

    try {

        $result = graphql_query($draft_live_sync->content_host, $query, $variables);        

        // Loop through the resources array and filter out the posts that don't exist
        $filteredResources = [];
        foreach ($result['data']['resources'] as $request) {
            $id = $request['content']['post_id'];
            $type = $request['content']['type'];
            $externalId = $type . '-' . $id;

            $post = $draft_live_sync->get_resource_from_content('', 'draft', $externalId);

            if ($post) {
                error_log('Including publication request: ' . $id);
                $filteredResources[] = $request;
            } else {
                error_log('Deleting dangling publication request: ' . $id);
                $result = $draft_live_sync->unpublishPublicationRequest($id);
            }
        }

        // Create a new object with the filtered resources
        $filteredResult = new stdClass();
        $filteredResult->data = new stdClass();
        $filteredResult->data->resources = $filteredResources;

        echo json_encode($filteredResult);

    } catch (Exception $e) {
        error_log('-- Error getting all publication requests --' . json_encode($e));
    }

    //Don't forget to always exit in the ajax function.
    exit();

} else {
    error_log('DLS CLASS DOES NOT EXIST!!!!');
}
