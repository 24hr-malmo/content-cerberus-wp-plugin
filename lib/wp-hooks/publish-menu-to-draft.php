<?php

trait PublishMenuToDraftTrait {

    public function publish_menu_to_draft( $post_id, $data = NULL ) {

        $menu_location = '';
        foreach( get_nav_menu_locations() as $location => $menu_id ) {
            if( $post_id == $menu_id ){
                $menu_location = $location;
            }
        }

        error_log(' --- publish menu location --- ' . $menu_location);

        $permalink = '';

        if ($menu_location != '') {
            if (defined('ICL_LANGUAGE_CODE') && ICL_LANGUAGE_CODE != 'en' && ICL_LANGUAGE_CODE != '') {
                $permalink = '/json/api/' . ICL_LANGUAGE_CODE . '/general/menu/' . $menu_location;
            } else {
                $permalink = '/json/api/general/menu/' . $menu_location;
            }
            $this->upsert('draft', $permalink);
        }

    }

}