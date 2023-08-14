<?php

    include 'short-init.php';

    if(class_exists( 'DraftLiveSync' )){

        error_log('-- api/delete-publication-request');

        try {
            $result = $draft_live_sync->unpublishPublicationRequest($_POST['postId']);
            echo json_encode($result);

        } catch (Exception $e) {
            error_log('-- Error deleting publication request --' . json_encode($e));
        }

        //Don't forget to always exit in the ajax function.
        exit();

    } else {
        error_log('DLS CLASS DOES NOT EXIST!!!!');
    }
