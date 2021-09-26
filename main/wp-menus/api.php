<?php


add_action( 'rest_api_init', function() {

    register_rest_route( 'content/v1', '/menus/(?P<location>\w+)/(?P<language>\w{2})', array(

        'methods' => WP_REST_Server::READABLE,

        'callback' => function($request) {

            $language = $request['language'];
            $menu_location = $request['location'];

            global $sitepress;
            global $draft_live_sync;
            if (isset($sitepress)) {
                $sitepress->switch_lang( $language, false );
            }

            $generator = new ContentCerberusMenuGenerator();
            $response = $generator->get_menu($menu_location, $language);

            return $draft_live_sync->clean_response($response);

        },

    ));

});

