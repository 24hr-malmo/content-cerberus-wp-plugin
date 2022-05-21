<?php

trait AjaxSaveToDraftTrait {

    public function ajax_save_to_draft() {

        $reponse = array();
        $permalink = '';
        
        if (!empty($_POST['post_id'])) {
            $id = $_POST['post_id'];
            $permalink = get_permalink($id);
            // error_log(' SAVING ID TO DRAFT ' . $id . ' -- permalink: ' . $permalink);
            // $response = $this->upsert('draft', $permalink);
        } else if (!empty($_POST['api_path'])){
            $permalink = $_POST['api_path'];
        }

        $response = $this->upsert('draft', $permalink);

        header( "Content-Type: application/json" );
        echo json_encode($response);

        //Don't forget to always exit in the ajax function.
        exit();

    }

}
