<?php

Trait RedirectToWpAdminTrait {

    // Rediect if the request if it is not WP requesting content from itself
    function redirect_to_wp_admin(){


        $auto_redirect = $this->settings_page->get_auto_redirect_to_admin_page();

        if ($auto_redirect) {

            $proxy_name = isset($_SERVER['HTTP_PROXY_SERVICE']) ? $_SERVER['HTTP_PROXY_SERVICE'] : '';

            $force_json = isset($_GET['json']) ? $_GET['json'] == ' true' : false;

            // If its an api request, or if we have ?json=true, then we just show the normal JSON response
            if ($proxy_name !== 'api' && $force_json !== 'true') {
                header("Location: /wp-admin");
                die();
            }

        }

    }

}
