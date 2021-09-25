<?php

trait AjaxResetTreeTrait {

    public function ajax_reset_tree() {

        $reponse = array();
        $target = $_POST['target'] === 'draft' ? 'draft' : 'live';

        $response = $this->recreate_tree($target);

        header( "Content-Type: application/json" );
        echo json_encode($response);

        //Don't forget to always exit in the ajax function.
        exit();

    }

}
