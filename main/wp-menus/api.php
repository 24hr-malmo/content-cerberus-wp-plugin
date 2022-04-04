<?php


add_action( 'rest_api_init', function() {

    function get_wp_menu_content($menu_location, $language) {

        global $draft_live_sync;

        $generator = new ContentCerberusMenuGenerator();
        $response = $generator->get_menu($menu_location, $language);

        return $draft_live_sync->clean_response($response);

    }

    register_rest_route( 'content/v1', '/menus/(?P<location>\w+)/(?P<language>\w{2})', array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => function($request) {
            return get_wp_menu_content($request['location'], $request['language']);
        },
    ));

    register_rest_route( 'content/v1', '/menus/(?P<location>\w+)', array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => function($request) {
            return get_wp_menu_content($request['location'], '');
        },
    ));



});


