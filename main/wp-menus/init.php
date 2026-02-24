<?php

include_once 'menu-generator.php';
include_once 'api.php';

/**
 * Manually save locations using our own language aware option key. This is for saving in wordpress side.
 * The current versions of WP and WPML, does not save locations language wise in the WP options table.
 * Normally you have only one wp option for locations. But we've made our custom locations entries that have a language suffix.
 * Runs earlier than WPML callbacks. We could explore option variable and see if we can set our custom key there instead and pipe those values to next hook. So we do not need to run a double update_option.
 */
add_filter('pre_update_option_theme_mods_rawb', function($value, $old_value, $option) {
    global $sitepress;

    if (!isset($sitepress) || !isset($value['nav_menu_locations'])) {
        return $value;
    }

    $current_lang = $sitepress->get_current_language();
    $option_name = "cerberus_nav_menus_{$current_lang}";

    // Store the ORIGINAL menu IDs before WPML converts them
    update_option($option_name, $value['nav_menu_locations']);

    return $value; // Let WPML continue with its conversion
}, 5, 3);

/**
 * Manually get correct location based on language. This is when WP needs to return values to page.
 * The current versions of WP and WPML, does not save header_menus language wise in the WP options table.
 * Normally you have only one wp option for locations. But we've made our custom locations entries that have a language suffix.
 * We only wanted to retrieve this modified value for the menu admin page, so giving this last prio should not interfere with other callbacks.
 * But we could try running this much earlier, before WPML. It might help out with some issues and values we get.
 */
add_filter('theme_mod_nav_menu_locations', function($locations) {
    global $sitepress;;

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
}, 999);

/**
 * Upsert nav menu. When menu is saved, we automatically sync to the draft version. Note this has nothing to do with locations, like header_menu.
 */
add_action('wp_update_nav_menu', function ( $post_id, $data = NULL ) {
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
 * Sync draft changes to location header_menu only. Has a guard to prevent unnecessary operations, since the target hook runs on any theme change.
 * Normally you have only one wp option for locations. But we've made our custom locations entries that have a language suffix.
 * This is manages sync to draft.
 */
add_action('update_option_theme_mods_rawb', function($old_value, $new_value) {

    $locationKey = 'header_menu';

    // This can be risky, since this is the vanilla WP/WPML saving nav menus, which are not language aware.
    // Basically we rely on any save to locations with key header_menu, indicates we want to sync draft for that location.
    // Even though this old and new value, may not be for the correct language.
    // Perhaps we can add a callback either on a earlier hook, or on this same hook, and tweak via a filter callback, with the correct value using language.
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

    // Not null, we have a lang spec header menu in WP. Provide with permalink and upsert, it'll find it in WP.
    if ($stored_locations !== null) {
        $draft_live_sync->upsert('draft', $location_permalink);
    }
    // Null, no lang spec header menu in WP anymore. Unpublish the permalink
    else if ($stored_locations === null) {
        $externalId = ContentCerberusMenuGenerator::build_external_id($locationKey, $current_lang);
        $draft_live_sync->unpublish('draft', $externalId, $location_permalink, );
    }
}, 999, 2);

/**
 * Introduces a new option key in WP for storing our own langauge aware locations.
 */
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
}, 100);







