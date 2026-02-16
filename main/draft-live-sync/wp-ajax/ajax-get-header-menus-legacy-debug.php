<?php

/**
 * LEGACY: Debug handler for pre-language-specific menu storage
 * This reads from theme_mods_rawb which was used before cerberus_nav_menus_{lang} system
 */
trait AjaxGetHeaderMenusLegacyDebugTrait {

    /**
     * LEGACY: Get header menus from theme_mods_rawb option
     */
    function ajax_get_header_menus_legacy_debug() {
        $result = array();

        // Get the raw theme_mods_rawb option
        $theme_mods = get_option('theme_mods_rawb', false);

        if ($theme_mods && is_array($theme_mods) && isset($theme_mods['nav_menu_locations'])) {
            $nav_locations = $theme_mods['nav_menu_locations'];

            // Look for header_menu in legacy storage
            if (isset($nav_locations['header_menu'])) {
                $menu_id = $nav_locations['header_menu'];
                $menu_term = get_term($menu_id, 'nav_menu');

                if (!is_wp_error($menu_term) && $menu_term) {
                    // LEGACY: No language suffix (pre-WPML integration)
                    $wp_permalink = '/wp-json/content/v1/menus/header_menu';
                    $external_id = 'menus-header_menu';

                    // Query content service using existing method
                    $draft_result = $this->get_resource_from_content($wp_permalink, 'draft');
                    $live_result = $this->get_resource_from_content($wp_permalink, 'live');

                    $draft_exists = isset($draft_result['data']['resource']) && !empty($draft_result['data']['resource']);
                    $live_exists = isset($live_result['data']['resource']) && !empty($live_result['data']['resource']);

                    $result[] = array(
                        'language' => 'N/A (legacy)',
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