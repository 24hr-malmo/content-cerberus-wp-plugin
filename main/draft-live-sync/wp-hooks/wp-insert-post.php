<?php

trait WpInsertPostTrait {

    public function wp_insert_post( $post_id, $post = null ) {

        if (is_integer($post_id)) {
            $post = get_post($post_id);
        }

        // If this is just a revision, don't send the email.
        if ( wp_is_post_revision($post_id)) {
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

        $permalink = '';

        $permalink = get_permalink($post->ID);

        $permalink = $this->cleanup_permalink($permalink);

        $this->upsert('draft', $permalink);
    }

}
