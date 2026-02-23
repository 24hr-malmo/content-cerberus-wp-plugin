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

            foreach ($this->get_location_permalinks_for_menu_byid_permalink($permalink) as $locationPermalink) {
                $this->unpublish('live', null, $locationPermalink);
            }
            
        }

        header( "Content-Type: application/json" );
        echo json_encode($response);

        //Don't forget to always exit in the ajax function.
        exit();

    }

}

