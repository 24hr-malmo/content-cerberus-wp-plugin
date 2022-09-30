<?php

trait AjaxUnpublishFromLiveTrait {

    public function ajax_unpublish_from_live() {

        $reponse = array();

        if (!empty($_POST['post_id'])) {
            $id = $_POST['post_id'];
            $response = $this->unpublish('live', $id);

        } else if (!empty($_POST['permalink'])){
            $permalink = $_POST['permalink'];
            $response = $this->unpublish('live', null, $permalink);

            if ($this->check_if_registered_menu_location_permalink($permalink)) {
                // If permalink is a menu with registered location (e.g. header_menu) we need to unpublish it in two places
                $contentDuplicatePermalink =  $this->get_menu_permalink_from_registered_menu_location_permalink($permalink);
                $this->unpublish('live', null, $contentDuplicatePermalink);
            }
        }

        header( "Content-Type: application/json" );
        echo json_encode($response);

        //Don't forget to always exit in the ajax function.
        exit();

    }

}
