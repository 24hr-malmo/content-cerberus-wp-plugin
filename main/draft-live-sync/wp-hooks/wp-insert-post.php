<?php

trait WpInsertPostTrait {

    public function wp_insert_post( $post_id, $post = null ) {

        error_log(' --- wp-insert-post --- $post_id: ' . $post_id);

        if (is_integer($post_id)) {
            $post = get_post($post_id);
        }

        // If this is just a revision, don't send the email.
        if ( wp_is_post_revision( $post_id)) { // ->ID)) {
            return;
        }

        if ($post->post_type == 'nav_menu_item') {
            return;
        }

        // status 'draft' or 'auto-draft' means its a wp draft page and we don't need to do anything
        // status 'trash' means we just trashed it and we don't need to take care of that here
        if ($post->post_status == 'draft' || $post->post_status == 'auto-draft' || $post->post_status == 'trash') {
            return;
        }

        $permalink = null;
        // If WPML, we use this to get permalink.
        if (function_exists('icl_object_id')) {
            $permalink = apply_filters('wpml_permalink', get_permalink($post->ID), ICL_LANGUAGE_CODE);
        } else {
            $permalink = get_permalink($post->ID);
        }

        $permalink = str_replace( site_url(), "", $permalink);

        $this->upsert('draft', $permalink);

    }

}
