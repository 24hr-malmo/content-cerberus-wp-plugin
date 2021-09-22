<?php

use Firebase\JWT\JWT;

trait WpReplacePreview {

    public function replace_preview() {

        $key = getenv('PREVIEW_JWT_SECRET');
        if (!isset($key)) {
            add_action( 'admin_notices', function() {
                $class = 'notice notice-error';
                $message = __( 'PREVIEW_JWT_SECRET env not set. To make the preview functionality work, this env variable needs to be provided.', 'content-cerberus');
                printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), esc_html( $message ) ); 
            });
            array(&$this, 'show_site_id_missing_warning'));
        }

        add_action('template_redirect', function() {

            if ($_GET['preview'] == 'true' && $_GET['caller'] != 'content-service') {

                global $post;
                $key = getenv('PREVIEW_JWT_SECRET');

                $domain_settings = $this->get_domain_settings(true, 'draft');
                $host = get_site_url();
                if (count($domain_settings) > 0) {
                    $domain_setting = $domain_settings[0];
                    $host = 'http://' . $domain_setting['content']['domain'];
                } else {
                    wp_die('Please set the correct domain in domain settings');
                }

                $slug =  $post->post_name;
                $iat = time();
                $exp = $iat + (60 * 60 * 1); //will expire after 1 hour
                $payload = array(
                    'iat' => $iat,
                    'exp' => $exp,
                    'preview_info' => http_build_query($_GET, '', '&'),
                    'cookies' => http_build_query($_COOKIE, '', ';'),
                );

                $jwt = JWT::encode($payload, $key);

                $link = "$host/$slug?preview=$jwt";

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

                        let hasTakenOver = false;

                        wp.data.subscribe(() => {
                            // This is not the pretties way of checking if the preview functionality has been activated
                            // but we havent found a good, documented, way to check if preview is enabled
                            const originalButton = document.querySelector('[target=\"wp-preview-$post->ID\"]');
                            if (originalButton) {
                                previewTakeover();
                            }
                        });

                        function previewTakeover() {

                            if (hasTakenOver) {
                                return;
                            }

                            const originalButton = document.querySelector('[target=\"wp-preview-$post->ID\"]');
                            const previewTarget = originalButton.target;

                            if (originalButton) {
                                hasTakenOver = true;

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
                                            .autosave({ isPreview: true })
                                            .then(() => {
                                                const originalButton = document.querySelector('[target=\"wp-preview-$post->ID\"]');
                                                const previewLink = originalButton.href;
                                                window.open( previewLink, previewTarget );
                                            });

                                    } else {
                                        const originalButton = document.querySelector('[target=\"wp-preview-$post->ID\"]');
                                        const previewLink = originalButton.href;
                                        window.open( previewLink, previewTarget );
                                    }

                                });

                            }

                        }

                        previewTakeover();

                   });
                </script>
            ";
        });

    }

}

