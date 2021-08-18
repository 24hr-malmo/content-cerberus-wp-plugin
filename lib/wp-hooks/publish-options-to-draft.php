<?php

trait PublishOptionsToDraftTrait {

    public function publish_options_to_draft($id) {

        // dont do anything if its a real post
        $post = get_post($id);

        if ($post->post_type != '') {
            return;
        }

        // guess what entity we are saving based on URL query string
        $slug = $_GET['page'];

        $permalinks = $this->get_other_resources();

        $targetPermalink = '';

        /**
         * This relies on the name of the options page matching the name specified in the dls_additional_endpoints function
         */
        foreach ($permalinks as $permalink) {
            if (preg_match('/' . $slug . '/', $permalink[0])) {
                $this->upsert('draft', $permalink[1]);
            }
        };

    }

}
