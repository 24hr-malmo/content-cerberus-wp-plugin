<?php

trait AjaxGetResourcesFromContentTrait {

    public function ajax_get_resources_from_content() {

        error_log('--- ajax_get_resources_from_content ---');

        $reponse = array();

        $target = $_POST['target'];
        $type = $_POST['type'];
        error_log('--- ajax_get_resources_from_content ---' . $target . ' ' . $type);

        $response = $this->get_resources_from_content($target, $type);
        error_log('--- ajax_get_resources_from_content ---' . json_encode($response));

        header( "Content-Type: application/json" );
        echo json_encode($response);

        //Don't forget to always exit in the ajax function.
        exit();

    }

}