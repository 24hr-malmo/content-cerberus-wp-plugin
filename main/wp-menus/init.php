<?php

include_once 'menu-generator.php';
include_once 'api.php';

add_action('init', function() {

    global $sitepress;
    global $draft_live_sync;

    $language = '';
    if (isset($sitepress)) {
        $language = '/' . $sitepress->get_current_language();
    }

    if (isset($draft_live_sync)) {

        $registered_locations = get_nav_menu_locations();
        foreach($registered_locations as $location => $index) {
            $permalink = '/wp-json/content/v1/menus/' . $location . $language;
            $draft_live_sync->add_additional_endpoint($permalink);
        }

    }

    add_action( 'wp_update_nav_menu', function ( $post_id, $data = NULL ) {

        /**
         * This is run whenever a menu is updated.
         * We save every menu under byId/$post_id.
         * If it happens to be a registered menu (e.g. header_menu - registered in functions.php) we also save it under that slug.
         */

        global $draft_live_sync;
        global $sitepress;

        $is_registered_location = false;
        $registered_menu_name = '';

        foreach( get_nav_menu_locations() as $location => $menu_id ) {
            if( $post_id == $menu_id ){

                $is_registered_location = true;
                $registered_menu_name = $location;

            }
        }

        $permalink = '';

        $language = '';
        if (isset($sitepress)) {
            $language = '/' . $sitepress->get_current_language();
        }

        $permalink = '/wp-json/content/v1/menus/byId/' . $post_id . $language;
        $draft_live_sync->upsert('draft', $permalink);
    
        if ($is_registered_location) {
            $permalink_named_menu = '/wp-json/content/v1/menus/' . $registered_menu_name . $language;
            $draft_live_sync->upsert('draft', $permalink_named_menu);
        }

    }, 10, 3);

}, 100);







