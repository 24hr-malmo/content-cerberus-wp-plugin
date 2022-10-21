<?php


add_action( 'rest_api_init', function() {

    function get_wp_menu_content_by_name($menu_location, $language) {

        global $sitepress;
        global $draft_live_sync;
        if (isset($language) && isset($sitepress)) {
            $sitepress->switch_lang( $language, false );
        }

        $generator = new ContentCerberusMenuGenerator();
        $response = $generator->get_menu_by_name($menu_location, $language);

        return $draft_live_sync->clean_response($response);

    }

    function get_wp_menu_content_by_id($id) {

        global $sitepress;
        global $draft_live_sync;
        if (isset($language) && isset($sitepress)) {
            $sitepress->switch_lang( $language, false );
        }

        $external_id_slug = 'by_id-' . $id;

        $generator = new ContentCerberusMenuGenerator();
        $response = $generator->get_menu($id, $external_id_slug);

        return $draft_live_sync->clean_response($response);

    }

    register_rest_route( 'content/v1', '/menus/(?P<location>\w+)/(?P<language>\w{2})', array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => function($request) {
            return get_wp_menu_content_by_name($request['location'], $request['language']);
        },
        'permission_callback' => '__return_true',
    ));

    register_rest_route( 'content/v1', '/menus/(?P<location>\w+)', array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => function($request) {
            return get_wp_menu_content_by_name($request['location'], '');
        },
        'permission_callback' => '__return_true',
    ));

    register_rest_route( 'content/v1', '/menus/byId/(?P<id>\d+)/(?P<language>\w{2})', array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => function($request) {
            return get_wp_menu_content_by_id($request['id'], $request['language']);
        },
        'permission_callback' => '__return_true',
    ));

    register_rest_route( 'content/v1', '/menus/byId/(?P<id>\d+)', array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => function($request) {
            return get_wp_menu_content_by_id($request['id']);
        },
        'permission_callback' => '__return_true',
    ));



});


