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

        error_log('--- updating nav menu');

        global $draft_live_sync;
        global $sitepress;

        $location_menus = get_nav_menu_locations(); // Fetches all menus with registered location
        $menu_location = '';

        foreach( $location_menus as $location => $menu_id ) {
            if( $post_id == $menu_id ){
                $menu_location = $location;
            }
        }

        $language = '';
        if (isset($sitepress)) {
            $language = '/' . $sitepress->get_current_language();
        }

        $permalink = '/wp-json/content/v1/menus/byId/' . $post_id . $language;
        $draft_live_sync->upsert('draft', $permalink);
    
        if ($menu_location !== '') {

            /**
             * If the menu is associated with a location we must also add it to that location's entry in the database
             */

            $location_permalink = '/wp-json/content/v1/menus/' . $menu_location . $language;
            $draft_live_sync->upsert('draft', $location_permalink);

        } else {

            foreach( get_registered_nav_menus() as $registered_location => $name) { // Fetches all registered locations - even if they don't have an associated menu
                
                if (!$location_menus[ $registered_location ]) { 
                    /**
                     * If we find a registered_location without an associated menu, the content in the registered menu location entry in the DB should be empty.
                     * This may not be the case if the user has recently unset the location for a particular menu.
                     * So we loop through all registered menu locations and make sure that if WP doesn't have any content associated with it, our DB (draft) mirrors this state and
                     * we unpublish the menu from draft in case it's not already empty
                     */

                    $languageSuffix = '';
                    if (isset($sitepress)) {
                        $languageSuffix = '-' . $sitepress->get_current_language();
                    }

                    $permalink_to_clear = '/wp-json/content/v1/menus/' . $registered_location . $language;
                    $externalId = 'menus-' . $registered_location . $languageSuffix;

                    $content = $draft_live_sync->get_content($permalink_to_clear);
    
                    if ($content->payload != '404' || !empty($content->payload)) {
                        error_log('--- unpublishing deleted menu(s) from draft: ' . $permalink_to_clear);
                        $draft_live_sync->unpublish('draft', $externalId, $permalink_to_clear);
                    }
        
                }
            }
            
        }

    }, 10, 3);

}, 100);







