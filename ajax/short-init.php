<?php

    // ------------------ START OF WP LOAD ------------------
    header( "Content-Type: application/json" );

    define( 'SHORTINIT', true );

    /** Define ABSPATH as this files directory */
    define( 'ABSPATH', dirname(__FILE__) . '/../../../../' );

    //WP config file
    require (ABSPATH . 'wp-load.php');

    if (!function_exists('sanitize_user')) {
        require( ABSPATH . WPINC . '/formatting.php' );
    }
    if (!function_exists('get_metadata')) {
        require( ABSPATH . WPINC . '/meta.php' );
    }

    // Define constants after multisite is loaded. Cookie-related constants may be overridden in ms_network_cookies().
    wp_cookie_constants( );

    require( ABSPATH . WPINC . '/link-template.php');


