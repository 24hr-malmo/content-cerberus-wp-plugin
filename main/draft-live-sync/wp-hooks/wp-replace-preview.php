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

                $link = "$host$permalink";

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
                <script type='text/javascript'>
                    window.addEventListener('load', () => {
                        const originalButton = document.querySelector('[target=\"wp-preview-$postID\"]');

                        if (originalButton) {
                            const previewLink = originalButton.href;
                            const previewTarget = originalButton.target;
                            const linkToPreview = document.createElement('a');
                            linkToPreview.classList.add('components-button');
                            linkToPreview.classList.add('is-secondary');
                            linkToPreview.innerHTML = 'Preview';
                            const editPost = document.querySelector('.edit-post-header__settings');
                            if (!editPost) {
                                return;
                            }
                            editPost.prepend(linkToPreview);
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