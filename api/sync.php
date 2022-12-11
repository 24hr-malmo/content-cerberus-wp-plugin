<?php

    include 'short-init.php';

    if(class_exists( 'DraftLiveSync' )){

        // Init or use instance of the manager.
        $dir = dirname( __FILE__ );
        $content_draft_url = getenv('CONTENT_DRAFT_URL');
        $api_token = getenv('API_TOKEN');

        $draft_live_sync = new DraftLiveSync($dir, DraftLiveSyncVERSION, $content_draft_url, $api_token, true);

        $permalink = $_POST['permalink'];
        $sync_check = $_POST['sync_check'] === 'true' ? true : false;

        $release = $_POST['release'] === 'draft' ? 'draft' : 'live';

        try {

            if ($release === 'live') {
                $result = $draft_live_sync->copy('draft', 'live', $permalink);
            } else {
                $result = $draft_live_sync->upsert('draft', $permalink);
            }

            // $result->permalink = $permalink;

            echo json_encode($result);

        } catch (Exception $e) {

            echo json_encode($e);

        }

        //Don't forget to always exit in the ajax function.
        exit();

    } else {
        error_log('DLS CLASS DOES NOT EXIST!!!!');
    }

