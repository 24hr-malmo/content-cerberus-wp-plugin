<?php

trait AjaxCheckSyncTrait {

    public function ajax_check_sync() {


        header( "Content-Type: application/json" );

        try {

            $reponse = array();

            if (!empty($_POST['post_id'])) {
                $id = $_POST['post_id'];
                $permalink = get_permalink($id);
                $response = $this->check_sync($permalink);
            } else if (!empty($_POST['api_path'])){
                $permalink = $_POST['api_path'];
                $response = $this->check_sync($permalink);
            }
            
            echo json_encode($response);

        } catch (Exception $err) {

            echo "{}";
        }

        //Don't forget to always exit in the ajax function.
        exit();

    }

}
