<?php

use Firebase\JWT\JWT;

trait WpReplacePreview {

    public function replace_preview() {

        add_action('template_redirect', function() {

            if ($_GET['preview'] == 'true' && $_GET['caller'] != 'content-service') {
                global $post;
                $key = "example_key";
                $host = "http://draft.dupont.sony.local";

                // $preview = 'preview_id=256&preview_nonce=5eb5b919e2&preview=true';
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

                        const originalButton = document.querySelector('[target=\"wp-preview-$post->ID\"]');
                        const previewLink = originalButton.href;
                        const previewTarget = originalButton.target;
         
                        if (originalButton) {

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
