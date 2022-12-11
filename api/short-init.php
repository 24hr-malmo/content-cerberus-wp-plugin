<?php

    header( "Content-Type: application/json" );

    define( 'SHORTINIT', '' );

    /** Define ABSPATH as this files directory */
    define( 'ABSPATH', dirname(__FILE__) . '/../../../../' );

    //WP config file
    require (ABSPATH . 'wp-load.php');

    require_once '../lib/graphql.php';
    require_once '../main/draft-live-sync-settings.php';
    require_once '../main/draft-live-sync/draft-live-sync-class.php';




