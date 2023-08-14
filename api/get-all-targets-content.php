<?php

    include 'short-init.php';

    if(class_exists( 'DraftLiveSync' )){

        // Init or use instance of the manager.
        $dir = dirname( __FILE__ );
        $content_host = getenv('CONTENT_HOST');
        $api_token = getenv('API_TOKEN');

        $draft_live_sync = new DraftLiveSync($dir, 'ajax-version', $content_host, $api_token, true);

        try {
            $permalink = '';
            
            $permalink = $draft_live_sync->cleanup_permalink($_POST['permalink']);
            
            $original = $draft_live_sync->get_content($permalink);
            $draft = $draft_live_sync->get_resource_from_content($permalink, 'draft');
            $live = $draft_live_sync->get_resource_from_content($permalink, 'live');
            
            $result['resource'] = $permalink;
            $result['original'] = $original;
            $result['draft'] = $draft;
            $result['live'] = $live;
            
            echo json_encode($result);

        } catch (Exception $e) {

        }

        //Don't forget to always exit in the ajax function.
        exit();

    } else {
        error_log('DLS CLASS DOES NOT EXIST!!!!');
    }
