<?php


/*
Plugin Name: Cerberus Content Next
Plugin URI: http://24hr.se
Description: Saves content to a Draft Content Service and gives the possibility to push the content to live
Version: 0.14.25-dupont
Author: Dr Tapia <camilo.tapia@24hr.se>
 */


// don't load directly
if ( !defined( 'ABSPATH' ) ) {

    error_log('ABSPATH not defined - terminating...');
    die( '-1' );

} else {

    $dir = dirname( __FILE__ );

    $plugin_info = get_file_data(__FILE__, array( 'Version' => 'Version') );
    define('DraftLiveSyncVERSION', $plugin_info['Version']);

    include_once 'lib/php-jwt/src/JWT.php';
    require_once 'lib/graphql.php';
    require_once 'main/draft-live-sync-wp-cron-fix.php';
    require_once 'main/draft-live-sync-settings.php';
    require_once 'main/draft-live-sync/draft-live-sync-class.php';
    require_once 'main/wp-menus/init.php';

    function draft_live_sync_init_new() {

        // Init or use instance of the manager.
        $dir = dirname( __FILE__ );
        $api_token = getenv('API_TOKEN');
        $content_host = getenv('CONTENT_HOST') ? getenv('CONTENT_HOST') : 'http://content';

        if(class_exists( 'DraftLiveSync' )){
            global $draft_live_sync;
            $draft_live_sync = new DraftLiveSync($dir, DraftLiveSyncVERSION, $content_host, $api_token);
        }

    }

    add_action( 'init', 'draft_live_sync_init_new');

    // Store language-specific menu locations BEFORE WPML converts them
    add_filter('pre_update_option_theme_mods_rawb', function($value) {
        global $sitepress;

        if (!isset($sitepress) || !isset($value['nav_menu_locations'])) {
            return $value;
        }

        $current_lang = $sitepress->get_current_language();
        $option_name = "cerberus_nav_menus_{$current_lang}";

        // Store the ORIGINAL menu IDs before WPML converts them
        update_option($option_name, $value['nav_menu_locations']);

        error_log("Cerberus: Stored menu locations for {$current_lang}: " . print_r($value['nav_menu_locations'], true));

        return $value; // Let WPML continue with its conversion
    }, 5); // Run before WPML (priority 10)

    // Retrieve language-specific menu locations (overrides WPML's converted values)
    add_filter('theme_mod_nav_menu_locations', function($locations) {
        global $sitepress;

        if (!isset($sitepress)) {
            return $locations;
        }

        $current_lang = $sitepress->get_current_language();
        $option_name = "cerberus_nav_menus_{$current_lang}";
        $stored_locations = get_option($option_name, false);

        if ($stored_locations !== false) {
            error_log("Cerberus: Retrieved menu locations for {$current_lang}: " . print_r($stored_locations, true));
            return $stored_locations;
        }

        return array();
    }, 999); // Run after WPML

}

