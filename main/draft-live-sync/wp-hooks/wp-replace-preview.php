<?php

trait WpReplacePreview {

    public function replace_preview() {

        add_action('template_redirect', function() {

            if ($_GET['preview'] == 'true' && $_GET['caller'] != 'content-service') {

                global $post;
                global $sitepress;

                $domain_settings = $this->get_domain_settings(true, 'draft');
                $host = get_site_url();
                if (count($domain_settings) > 0) {
                    $domain_setting = $domain_settings[0];
                    $host = 'http://' . $domain_setting['content']['domain'];
                } else {
                    wp_die('Please set the correct domain in domain settings');
                }

                $slug = $post->post_name;

                $language = '';
                if (isset($sitepress)) {
                    $language = '/' . $sitepress->get_current_language();
                    $default_language = '/' . $sitepress->get_default_language();

                    //Remove default language, otherwise we get /${lang}/wp_block/ even when we go to default language page (which we normally treat as the base site)
                    if ($language == $default_language) {
                        $language = '';
                    }
                }

                $iat = time();
                $exp = $iat + (60 * 60 * 1); //will expire after 1 hour
                $payload = array(
                    'iat' => $iat,
                    'exp' => $exp,
                    'preview_info' => http_build_query($_GET, '', '&'),
                    'cookies' => http_build_query($_COOKIE, '', ';'),
                );

                $link = "$host$language/$slug";

                error_log('~~~~~~~~~~~~~ template_redirect ~~~~~~~~~~~~~' . $link);

                header('Location: ' . $link);
            }

        });

        add_action( 'admin_head', function () {
            global $post;
            echo "
                <style>
                    button.block-editor-post-preview__button-toggle {
                        display: none;
                    }
                </style>
                <script type='text/javascript'>
                    window.addEventListener('load', () => {
                        const originalButton = document.querySelector('[target=\"wp-preview-$post->ID\"]');

                        if (originalButton) {
                            const previewLink = originalButton.href;
                            const previewTarget = originalButton.target;
                            const linkToPreview = document.createElement('a');
                            linkToPreview.classList.add('components-button');
                            linkToPreview.classList.add('is-secondary');
                            linkToPreview.innerHTML = 'Preview';
                            document.querySelector('.edit-post-header__settings').prepend(linkToPreview);
                            linkToPreview.addEventListener('click', function(event) {
                                if (wp.data.select('core/editor').isEditedPostDirty()) {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    wp.data
                                        .dispatch('core/editor')
                                        .savePost({ isPreview: true })
                                        .then(() => {
                                            window.open( previewLink, previewTarget );
                                        });
                                } else {
                                    window.open( previewLink, previewTarget );
                                }

                            });
                        }
                    });
                </script>
            ";
        });

    }

}