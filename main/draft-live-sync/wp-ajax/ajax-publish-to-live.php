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

        foreach ($this->get_location_permalinks_for_menu_byid_permalink($permalink) as $locationPermalink) {
            $this->copy('draft', 'live', $locationPermalink);
        }

        header( "Content-Type: application/json" );
        echo json_encode($response);

        //Don't forget to always exit in the ajax function.
        exit();

    }

}
