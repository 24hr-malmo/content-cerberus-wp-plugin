<?php

    include 'short-init.php';

    if(class_exists( 'DraftLiveSync' )){

        // Init or use instance of the manager.
        $dir = dirname( __FILE__ );
        $content_host = getenv('CONTENT_HOST');
        $api_token = getenv('API_TOKEN');

        $draft_live_sync = new DraftLiveSync($dir, 'ajax-version', $content_host, $api_token, true);

        $permalink = null;
        $only_draft_sync = isset($_POST['only_draft_sync']) ? $_POST['only_draft_sync'] == 'true' : false;

        try {

            if (function_exists('icl_object_id')) {
                $permalink = apply_filters('wpml_permalink', $_POST['permalink'], ICL_LANGUAGE_CODE);
            } else {
                $permalink = $_POST['permalink'];
            }

            error_log('--- check-sync api --- $permalink: ' . $permalink);

            $result = $draft_live_sync->check_sync($permalink, $only_draft_sync);
            $result->resource = $permalink;

            echo json_encode($result);

        } catch (Exception $e) {

        }

        //Don't forget to always exit in the ajax function.
        exit();

    } else {
        error_log('DLS CLASS DOES NOT EXIST!!!!');
    }
