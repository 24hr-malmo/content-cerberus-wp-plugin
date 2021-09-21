<?php


/*
Plugin Name: Cerberus Content Next
Plugin URI: http://24hr.se
Description: Saves content to a Draft Content Service and gives the possibility to push the content to live
Version: 0.11.14
Author: Dr Tapia <camilo.tapia@24hr.se>
 */

include_once 'lib/lib/php-jwt/src/JWT.php';

// don't load directly
if ( !defined( 'ABSPATH' ) ) {

    error_log('ABSPATH not defined - terminating...');
    die( '-1' );

} else {

    $dir = dirname( __FILE__ );
    error_log('init draft live sync plugin dir ' . $dir);

    $plugin_info = get_file_data(__FILE__, array( 'Version' => 'Version') );
    define('DraftLiveSyncVERSION', $plugin_info['Version']);

    require_once( $dir . '/lib/draft-live-sync-wp-cron-fix.php' );
    require_once( $dir . '/lib/draft-live-sync-class.php' );

    function draft_live_sync_init_new() {

        // Init or use instance of the manager.
        $dir = dirname( __FILE__ );
        $api_token = getenv('API_TOKEN');
        $content_host = getenv('CONTENT_HOST');

        if(class_exists( 'DraftLiveSync' )){
            global $draft_live_sync;
            $draft_live_sync = new DraftLiveSync($dir, DraftLiveSyncVERSION, $content_host, $api_token);
        }

    }

    add_action( 'init', 'draft_live_sync_init_new');

}

