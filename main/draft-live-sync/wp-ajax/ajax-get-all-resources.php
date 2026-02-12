<?php

trait AjaxGetAllResourcesTrait {

    /**
     * List of items in sync draft page
     */
    function ajax_get_all_resources() {
        $result = new stdclass();
        $all_languages = isset($_POST['all_languages']) && $_POST['all_languages'] === 'true';
        $result->list = $this->get_all_resources($all_languages);
        $json = json_encode($result);
        header('Content-Type: application/json');
        echo $json;
        exit();
    }

}
