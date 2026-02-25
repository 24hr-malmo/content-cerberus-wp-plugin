<?php

class CerberusExternalId {

    /**
     * For menus identified by their WordPress term ID.
     * Never includes language — WPML gives each language its own term_id,
     * so the ID is already language-specific.
     */
    public static function from_menu_id($term_id) {
        return 'menus-by_id-' . $term_id;
    }

    /**
     * For menus identified by their registered location slug.
     * Always includes language — the same slug (e.g. "primary") can serve
     * multiple languages simultaneously.
     */
    public static function from_menu_location($location_slug, $language = '') {
        return 'menus-' . $location_slug . ($language ? '-' . $language : '');
    }

    /**
     * For standard WordPress posts and pages.
     */
    public static function from_post($post_type, $post_id) {
        return $post_type . '-' . $post_id;
    }

}