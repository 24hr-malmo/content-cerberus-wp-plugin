<?php

trait AjaxPublishToLiveTrait {

    public function ajax_publish_to_live() {

        $reponse = array();
        $permalink = '';

        if (!empty($_POST['post_id'])) {
            $id = $_POST['post_id'];
            $permalink = get_permalink($id);
        } else if (!empty($_POST['permalink'])){
            $permalink = $_POST['permalink'];
        }

        $response = $this->copy('draft', 'live', $permalink);
        $response = apply_filters('cerberus_publish_to_live', $response, $permalink);

        if ($this->check_if_registered_menu_location_permalink($permalink)) {
            // If permalink is a menu with registered location (e.g. header_menu) we need to publish it in two places
            $contentDuplicatePermalink =  $this->get_menu_permalink_from_registered_menu_location_permalink($permalink);
            $this->copy('draft', 'live', $contentDuplicatePermalink);
        }

        header( "Content-Type: application/json" );
        echo json_encode($response);

        //Don't forget to always exit in the ajax function.
        exit();

    }

}
