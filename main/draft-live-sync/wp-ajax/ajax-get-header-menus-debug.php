<?php

trait AjaxGetHeaderMenusDebugTrait {

    /**
     * Get all header menus from WordPress and their status in content service
     */
    function ajax_get_header_menus_debug() {
        global $sitepress;

        $result = array();

        // Get all available languages from WPML
        $languages = array();
        if (isset($sitepress)) {
            $languages = $sitepress->get_active_languages();
        } else {
            // Fallback: just check default language
            $languages = array('default' => array('code' => ''));
        }

        foreach ($languages as $lang_data) {
            $lang_code = $lang_data['code'];
            $option_name = $lang_code ? "cerberus_nav_menus_{$lang_code}" : "cerberus_nav_menus_";

            // Get the stored menu locations for this language
            $stored_locations = get_option($option_name, array());

            // Also check current nav menu locations if WPML is active
            if (isset($sitepress)) {
                $sitepress->switch_lang($lang_code, false);
                $current_locations = get_nav_menu_locations();
            } else {
                $current_locations = get_nav_menu_locations();
            }

            // Merge stored and current locations
            $all_locations = array_merge(
                $stored_locations ?: array(),
                $current_locations ?: array()
            );

            // Look for header_menu specifically
            if (isset($all_locations['header_menu'])) {
                $menu_id = $all_locations['header_menu'];
                $menu_term = get_term($menu_id, 'nav_menu');

                if (!is_wp_error($menu_term) && $menu_term) {
                    // Construct WP permalink
                    $language_suffix = $lang_code ? '/' . $lang_code : '';
                    $wp_permalink = '/wp-json/content/v1/menus/header_menu' . $language_suffix;

                    // Construct externalId (following pattern from menu-generator.php:31)
                    $external_id_suffix = $lang_code ? '-' . $lang_code : '';
                    $external_id = 'menus-header_menu' . $external_id_suffix;

                    // Query content service using existing method
                    $draft_result = $this->get_resource_from_content($wp_permalink, 'draft');
                    $live_result = $this->get_resource_from_content($wp_permalink, 'live');

                    $draft_exists = isset($draft_result['data']['resource']) && !empty($draft_result['data']['resource']);
                    $live_exists = isset($live_result['data']['resource']) && !empty($live_result['data']['resource']);

                    $result[] = array(
                        'language' => $lang_code ?: 'default',
                        'wp_menu_id' => $menu_id,
                        'wp_menu_name' => $menu_term->name,
                        'wp_permalink' => $wp_permalink,
                        'draft_external_id' => $draft_exists ? $external_id : null,
                        'draft_key' => $draft_exists ? $wp_permalink : null,
                        'live_external_id' => $live_exists ? $external_id : null,
                        'live_key' => $live_exists ? $wp_permalink : null,
                    );
                }
            }
        }

        header('Content-Type: application/json');
        echo json_encode(array('menus' => $result));
        exit();
    }
}