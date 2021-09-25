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

        global $draft_live_sync;
        global $sitepress;

        $menu_location = '';
        foreach( get_nav_menu_locations() as $location => $menu_id ) {
            if( $post_id == $menu_id ){
                $menu_location = $location;
            }
        }

        $permalink = '';

        if ($menu_location != '') {

            $language = '';
            if (isset($sitepress)) {
                $language = '/' . $sitepress->get_current_language();
            }
            $permalink = '/wp-json/content/v1/menus/' . $menu_location . $language;

            $draft_live_sync->upsert('draft', $permalink);

        }

    }, 10, 3);

}, 100);







