<?php

trait AjaxGetAllResourcesTrait {

    /**
     * List of items in sync draft page
     */
    function ajax_get_all_resources() {
        $result = new stdclass();
        $result->list = $this->get_all_resources();
        $json = json_encode($result);
        header('Content-Type: application/json');
        echo $json;
        exit();
    }

}
