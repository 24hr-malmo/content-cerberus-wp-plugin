<?php

trait WpInsertPostTrait {

    public function wp_insert_post( $post_id, $post = null ) {

        error_log(' --- INSERT POST WP HOOK ---' . $post_id);

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

        $permalink = get_permalink($post_id);


        $permalink = str_replace( home_url(), "", $permalink);

        if ($post->post_type === 'wp_block') {
            $permalink = '/wp_block' . $permalink;
        }

        $this->upsert('draft', $permalink);

    }

}
