<?php


/*
Plugin Name: Cerberus Content Next
Plugin URI: http://24hr.se
Description: Saves content to a Draft Content Service and gives the possibility to push the content to live
Version: 0.16.20-atos
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

}

