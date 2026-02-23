<?php

include_once 'menu-generator.php';
include_once 'api.php';


/**
 * The current versions of WP and WPML, does not save header_menus language wise in the WP options table.
 * This callback generates our own option for location and store language-specific menu locations. A read callback also exists to retrieve our own options.
 * Normally you have only one wp option for locations. But we've made our custom locations entries that have a language suffix.
 */
add_filter('pre_update_option_theme_mods_rawb', function($value, $old_value, $option) {
    global $sitepress;

    error_log('--- I AM AWAKE ---');
    error_log('AWAKE1:' . var_export($value, true));
    error_log('AWAKE1:' . var_export($old_value, true));
    error_log('AWAKE1:' . var_export($option, true));

    if (!isset($sitepress) || !isset($value['nav_menu_locations'])) {
        return $value;
    }

    $current_lang = $sitepress->get_current_language();
    $option_name = "cerberus_nav_menus_{$current_lang}";

    // Store the ORIGINAL menu IDs before WPML converts them
    update_option($option_name, $value['nav_menu_locations']);
    

    return $value; // Let WPML continue with its conversion
}, 5, 3); // Run before WPML (priority 10)

/**
 * The current versions of WP and WPML, does not save header_menus language wise in the WP options table.
 * This is a read callback that gives us our custom options.
 * We only wanted to retrieve this modified value for the menu admin page, so giving this last prio should not interfere with other callbacks.
 * Normally you have only one wp option for locations. But we've made our custom locations entries that have a language suffix.
 */
add_filter('theme_mod_nav_menu_locations', function($locations) {
    global $sitepress;

    error_log('--- I AM ASLEEP ---');
    error_log('ASLEEP1:' . var_export($locations, true));

    if (!isset($sitepress)) {
        return $locations;
    }

    $current_lang = $sitepress->get_current_language();
    $option_name = "cerberus_nav_menus_{$current_lang}";
    $stored_locations = get_option($option_name, false);

    if ($stored_locations !== false) {
        return $stored_locations;
    }

    return array();
}, 999); // Run after WPML

// WARNING! These action registrations are important and must be registered in the following order. DO NOT MOVE THEM.

/**
 * Upsert nav menu. This is draft
 */
add_action('wp_update_nav_menu', function ( $post_id, $data = NULL ) {
    error_log('--- Updating nav menu - upserting menu to draft');
    global $draft_live_sync;
    global $sitepress;

    $language = '';
    $languageSuffix = '';
    if (isset($sitepress)) {
        $language = '/' . $sitepress->get_current_language();
        $languageSuffix = '-' . $sitepress->get_current_language();
    }

    $permalink = '/wp-json/content/v1/menus/byId/' . $post_id . $language;
    $draft_live_sync->upsert('draft', $permalink);
}, 10, 3);

/**
 * Sync changes to location header_menu only. Has a guard to prevent unnecessary operatoins, since the target hook runs on any theme change.
 * Normally you have only one wp option for locations. But we've made our custom locations entries that have a language suffix.
 * This is draft.
 */
add_action('update_option_theme_mods_rawb', function($old_value, $new_value) {

    error_log('--- Updating nav locations - upserting menu location to draft');
    error_log('--- DEBUG nav locations --- $old_value: ' . print_r($old_value, true));
    error_log('--- DEBUG nav locations --- $new_value: ' . print_r($new_value, true));

    $locationKey = 'header_menu';

    // This can be risky, since this is the vanilla WP/WPML saving nav menus, which are not language aware.
    // Basically we rely on any save to locations with key header_menu, indicates we want to sync draft for that location.
    // Even though this old and new value, may not be for the correct language.
    if (($old_value['nav_menu_locations'][$locationKey] ?? null) === ($new_value['nav_menu_locations'][$locationKey] ?? null)) {
        return; // locations unchanged, skip
    }

    global $draft_live_sync;
    global $sitepress;

    $current_lang = '';
    $languageUrlSuffix = '';
    if (isset($sitepress)) {
        $current_lang =  $sitepress->get_current_language();
        $languageUrlSuffix = '/' . $sitepress->get_current_language();
    }

    $option_name = "cerberus_nav_menus_{$current_lang}";
    $stored_locations = get_option($option_name, [])[$locationKey] ?? null; // Gives back an ID from WP
    $location_permalink = '/wp-json/content/v1/menus/' . $locationKey . $languageUrlSuffix;

    error_log('--- DEBUG $option_name: ' . var_export($option_name, true));
    error_log('--- DEBUG $stored_locations: ' . var_export($stored_locations, true));

    // Not null, we have a lang spec header menu in WP. Provide with permalink and upsert, it'll find it in WP.
    if ($stored_locations !== null) {
        error_log('--- DEBUG $Not null, upsert to draft: ' . var_export($location_permalink, true));
        $draft_live_sync->upsert('draft', $location_permalink);
    }
    // Null, no lang spec header menu in WP anymore. Unpublish the permalink
    else if ($stored_locations === null) {
        error_log('--- DEBUG $Is null, unpublish to draft: ' . var_export($location_permalink, true));
        $externalId = ContentCerberusMenuGenerator::build_external_id($locationKey, $current_lang);
        $draft_live_sync->unpublish('draft', $externalId, $location_permalink, );
    }
}, 999, 2);

/**
 * Sync location changes. Has a guard to prevent unnecessary operatoins, since the target hook runs on any theme change.
 */
add_action('update_option_theme_mods_rawb', function($old_value, $new_value) {
    // error_log('--- Updating nav locations - upserting menu to draft');

    // error_log('--- Updating nav locations --- $old_value: ' . $old_value);

    // error_log('--- Updating nav locations --- $new_value: ' . $new_value);
    // if (($old_value['nav_menu_locations'] ?? []) === ($new_value['nav_menu_locations'] ?? [])) {
    //     return; // locations unchanged, skip
    // }
    // We'll see if we need to do anything here
}, 999, 2);

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

    // add_action('wp_update_nav_menu', function ( $post_id, $data = NULL ) {
        
    //     error_log('--- Updating nav menu - upserting menu location to draft');
    //     error_log('--- $data: ' . print_r($data, true));

    //     global $draft_live_sync;
    //     global $sitepress;

    //     $language = '';
    //     $languageSuffix = '';
    //     if (isset($sitepress)) {
    //         $language = '/' . $sitepress->get_current_language();
    //         $languageSuffix = '-' . $sitepress->get_current_language();
    //     }

    //     $location_menus = get_nav_menu_locations(); // Fetches all menus with registered location
    //     $menu_location = '';

    //     foreach( $location_menus as $location => $menu_id ) {
    //         if( $post_id == $menu_id ){
    //             $menu_location = $location;
    //         }
    //     }

    //     /**
    //      * If the menu is associated with a location we must also add it to that location's entry in the database
    //      * Location assignments ARE language-specific, so we include the language suffix
    //      */

    //     if ($menu_location !== '') {
    //         $location_permalink = '/wp-json/content/v1/menus/' . $menu_location . $language;
    //         $draft_live_sync->upsert('draft', $location_permalink);
    //     }

    // }, 10, 3);

    // add_action('wp_update_nav_menu', function ( $post_id, $data = NULL ) {

    //     error_log('--- Updating nav menu - Resync all menu location to draft');
    //     error_log('--- $data: ' . print_r($data, true));

    //     global $draft_live_sync;
    //     global $sitepress;

    //     $language = '';
    //     $languageSuffix = '';
    //     if (isset($sitepress)) {
    //         $language = '/' . $sitepress->get_current_language();
    //         $languageSuffix = '-' . $sitepress->get_current_language();
    //     }

    //     $location_menus = get_nav_menu_locations();

    //      foreach( get_registered_nav_menus() as $registered_location => $name) { // Fetches all registered locations - even if they don't have an associated menu

    //         if (!$location_menus[ $registered_location ]) {
    //             /**
    //              * If we find a registered_location without an associated menu, the content in the registered menu location entry in the DB should be empty.
    //              * This may not be the case if the user has recently unset the location for a particular menu.
    //              * So we loop through all registered menu locations and make sure that if WP doesn't have any content associated with it, our DB (draft) mirrors this state and
    //              * we unpublish the menu from draft in case it's not already empty
    //              */

    //             $permalink_to_clear = '/wp-json/content/v1/menus/' . $registered_location . $language;
    //             $externalId = 'menus-' . $registered_location . $languageSuffix;

    //             $content = $draft_live_sync->get_content($permalink_to_clear);

    //             if ($content->payload != '404' || !empty($content->payload)) {
    //                 error_log('--- unpublishing deleted menu(s) from draft: ' . $permalink_to_clear);
    //                 $draft_live_sync->unpublish('draft', $externalId, $permalink_to_clear);
    //             }
    //         }
    //     }
    // }, 10, 3);


}, 100);







