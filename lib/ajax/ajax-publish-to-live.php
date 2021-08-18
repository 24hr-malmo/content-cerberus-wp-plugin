<?php

trait AjaxPublishToLiveTrait {

    public function ajax_publish_to_live() {

        $reponse = array();

        if (!empty($_POST['post_id'])) {
            $id = $_POST['post_id'];
            $permalink = get_permalink($id);

            $response = $this->upsert('live', $permalink);

        } else if (!empty($_POST['permalink'])){
            $permalink = $_POST['permalink'];
            $response = $this->upsert('live', $permalink);
        }

        header( "Content-Type: application/json" );
        echo json_encode($response);

        //Don't forget to always exit in the ajax function.
        exit();

    }

}
