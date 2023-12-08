<?php

trait WpReplacePreview {

    public function replace_preview() {

        add_action('template_redirect', function() {

            if (isset($_GET['preview']) && $_GET['preview'] == 'true' && $_GET['caller'] != 'content-service') {

                global $post;
                global $sitepress;
                global $wp_query;

                $domain_settings = $this->get_domain_settings(true, 'draft');
                $host = get_site_url();
                if (count($domain_settings) > 0) {
                    $domain_setting = $domain_settings[0];
                    $host = 'http://' . $domain_setting['content']['domain'];
                } else {
                    wp_die('Please set the correct domain in domain settings');
                }

                $permalink = get_permalink($post->ID);
                $permalink = $this->cleanup_permalink($permalink);

                $formatted_link = "$host$permalink";

                $link = apply_filters( 'customize_preview_link', $formatted_link, $post, $host );

                header('Location: ' . $link);
            }

        });

        add_action( 'admin_head', function () {
            global $post;
            $postID = isset($post->ID) ? $post->ID : '';
            echo "
                <style>
                    button.block-editor-post-preview__button-toggle {
                        display: none;
                    }
                </style>
            ";
        });

    }

}
