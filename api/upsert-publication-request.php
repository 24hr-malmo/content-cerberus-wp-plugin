<?php

    include 'short-init.php';

    if(class_exists( 'DraftLiveSync' )){

        error_log('-- api/upsert-publication-request');

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
        $approvalStatus = $_POST['status'];
        $editorUrl = $_POST['editorUrl'];
        $approvedBy = $_POST['approvedBy'];
        $rejectedBy = $_POST['rejectedBy'];
        $rejectionReason = $_POST['rejectionReason'];

        try {
            $post = $draft_live_sync->get_content($permalink);
        } catch (Exception $e) {}

        global $blog_id;
        if ( is_multisite() ) {
            $current_blog_details = get_blog_details( array( 'blog_id' => $blog_id) );
        } else {
            $current_blog_details = new stdClass();
            $current_blog_details->blogname = '';
        }

        $siteName = $current_blog_details->blogname;
        
        $variables = array(
            'target' => 'publication-requests',
            'siteId' => 'publication-requests',
            'userInfo' => strval($user->ID),
            'resource' => array(
                'key' => $permalink,
                'externalId' => 'publication-request-' . $post->payload->id,
                'type' => 'publication-request',
                'content' => array(
                    'from_user_id' => strval($user->ID),
                    'from_user_name' => strval($user->user_nicename),
                    'from_user_email' => strval($user->user_email),
                    'from_site_id' => $draft_live_sync->get_site_id(),
                    'from_site_name' => $siteName,
                    'post_title' => $post->payload->post_title,
                    'post_id' => $post->payload->id,
                    'permalink' => $post->payload->permalink,
                    'type' => $post->payload->type,
                    'updated_on' => date(DATE_ISO8601),
                    'wp-domain' => get_site_url(),
                    'status' => $approvalStatus,
                    'editorUrl' => $editorUrl,
                    'approvedBy' => $approvedBy,
                    'rejectedBy' => $rejectedBy,
                    'rejectionReason' => $rejectionReason,
                ),
                'tags' => [$approvalStatus],
            ),
        );

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
            error_log('Error upserting publication request: ' . $e);
        }

        //Don't forget to always exit in the ajax function.
        exit();

    } else {
        error_log('DLS CLASS DOES NOT EXIST!!!!');
    }
