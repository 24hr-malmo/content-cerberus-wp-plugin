<?php

if ( ! class_exists( 'DraftLiveSync' ) ) {

    require_once 'wp-ajax/index.php';
    require_once 'content/index.php';
    require_once 'misc/index.php';
    require_once 'wp-hooks/index.php';

    class DraftLiveSync {

        use ContentTrait;
        use AjaxTrait;
        use MiscTrait;
        use WpHooksTrait;

        static $version;
        protected $dir;
        protected $plugin_dir;
        public $content_draft_url;
        protected $api_token;
        protected $init = false;
        protected $short_init = false;
        private $js_script = '';
        static $singleton;

        private $pre_term_url;
        private $settings_page;
        private $site_id;

        private $additional_endpoints = array();

        static function getInstance() {
            if (is_null(DraftLiveSync::$singleton)) {
                throw new Exception('DraftLiveSync not instanciated');
            }
            return DraftLiveSync::$singleton;
        }

        function __construct($dir, $version, $content_host, $api_token, $short_init = false) {

            DraftLiveSync::$version = $version;

            if (!isset($content_host) || $content_host == null) {
                $content_host = getenv('CONTENT_HOST');
            }

            $this->dir = $dir;
            $this->content_host = $content_host . '/graphql';
            $this->api_token = $api_token;
            $this->short_init = $short_init;
            $this->plugin_dir = basename( $this->dir );
            $this->js_script = plugins_url( '../../js-dist/draft-live-sync-boot-' . DraftLiveSync::$version . '.js', __FILE__ );

            $this->init();

            DraftLiveSync::$singleton = $this;

            $this->settings_page = new DraftLiveSyncSettings($this);

            $this->site_id = $this->settings_page->get_site_id();

            if (!isset($this->site_id) || $this->site_id === '' ) {
                // Set a random string as the site id
                $this->settings_page->set_site_id($this->generate_random_string());
                $this->site_id = $this->settings_page->get_site_id();
                // add_action( 'admin_notices', array(&$this, 'show_site_id_missing_warning'));
            }

        }

        public function init() {

            // Disable double initialization.
            if ( $this->init ) {
                return $this;
            }

            $this->init = true;

            if (!$this->short_init) {

                remove_action('template_redirect', 'redirect_canonical');

                add_action( 'add_meta_boxes', array( &$this, 'meta_box_publish_status') );

                add_filter( 'nav_menu_meta_box_object', array( &$this, 'meta_box_publish_status_nav_menus') ); // Here we know the user is on nav-menu.php page
                add_action( 'publish_status_meta_box_navbox', array( &$this, 'publish_status_meta_box_callback'), 10, 2); // Special case (wrappers calls this action later)

                // We used **save_post** before but even if the post is saved, it seems like WP still doesnt answer
                // to the correct permalink. **wp_insert_post** works better.
                add_action( 'wp_insert_post', array( &$this, 'wp_insert_post'), 10, 2 );

                // All the following hooks where tested for deletion, but none of them worked properly
                // either triggering the delete process too soon or something alike
                // ----------------------------------------------------------------
                // add_action( 'trash_post', array( &$this, 'delete_post'), 10, 1 );
                // add_action( 'trashed_post', array( &$this, 'delete_post'), 10, 1 );
                // add_action( 'delete_post', array( &$this, 'delete_post'), 10, 1 );

                // We use **save_post** for deleting purposes
                add_action( 'save_post', array( &$this, 'delete_post'), 10, 1 );
                add_action( 'pre_delete_term', array( &$this, 'pre_publish_term_to_draft'), 1, 2);
                add_action( 'delete_term', array( &$this, 'post_publish_term_to_draft'), 1, 3);
                add_action( 'wp_ajax_publish_to_live', array( &$this, 'ajax_publish_to_live') );
                add_action( 'wp_ajax_save_to_draft', array( &$this, 'ajax_save_to_draft') );
                add_action( 'wp_ajax_unpublish_from_live', array( &$this, 'ajax_unpublish_from_live') );
                add_action( 'wp_ajax_check_sync', array( &$this, 'ajax_check_sync') );
                add_action( 'wp_ajax_get_diff', array( &$this, 'ajax_get_diff') );
                add_action( 'wp_ajax_reset_tree', array( &$this, 'ajax_reset_tree') );
                add_action( 'wp_ajax_get_all_resources', array( &$this, 'ajax_get_all_resources') );
                add_filter( 'admin_menu', array( &$this, 'add_admin_pages'), 10, 2 );
                add_filter( 'network_admin_menu', array( &$this, 'add_network_admin_pages'), 10, 2 );
                add_action( 'parse_request', array( &$this, 'parse_requests'));
                add_filter( 'gettext', array( &$this, 'change_publish_button'), 10, 2 );
                add_filter( 'get_sample_permalink', array( &$this, 'set_correct_permalink'));//Is this used at all? get_sample_permalink doesn't have same params as page_link, so should maybe be a different function
                add_filter( 'page_link', array( &$this, 'set_correct_permalink'));
                add_action( 'admin_enqueue_scripts', array(&$this, 'enqueue_admin_scripts' ));
                add_action( 'admin_head-post.php', array( &$this, 'hide_publishing_actions'));
                add_action( 'admin_head-post-new.php', array( &$this, 'hide_publishing_actions'));

                // Filter the content so we can replace hosts etc
                add_filter('dls_replace_hosts', array(&$this, 'filter_the_content_replace_hosts'), 100);

                // This will check if we should redirect normal requests to the admin page
                add_action('template_redirect', array(&$this, 'redirect_to_wp_admin'), 20);

                add_action( 'pre_get_posts', array (&$this, 'prepare_query_for_wp_blocks'), 20);

                // $this->add_actions_for_options_pages();
                $this->replace_preview();

            }

            return $this;

        }

        // This will make sure we intercept all calls to /wp_blocks and expose the content of the wp_block as a normal post type.
        // In order for this to work, you need to have a template called single-wp_block.php
        /**
         * for: reusable blocks
         */
        function prepare_query_for_wp_blocks ( $query ) {
            global $wp_query;
            global $wp;
            if (strpos($wp->request, 'wp_block/') === 0) {
                $query-> set('post_type' ,'wp_block');
            }
        }

        function generate_random_string($length = 10) {
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $charactersLength = strlen($characters);
            $randomString = '';
            for ($i = 0; $i < $length; $i++) {
                $randomString .= $characters[rand(0, $charactersLength - 1)];
            }
            return $randomString;
        }

        function show_site_id_missing_warning() {
            $class = 'notice notice-error';
            $message = __( 'Please set the site_id in the Draft Sync Plugin settings!', 'dls');
            printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), esc_html( $message ) );
        }


        // Adds an ACF options screen/page so it can be handled by content cerberus
        public function activate_acf_options($options_name, $permalink) {

            // This will first check if the page is the top page ( index 2 when chekcking the list
            // If its above index 2, we use another prefix for the slug.
            // This is due to how ACF gives its names to the action hooks for options pages
            $options_page = "toplevel_page_$options_name";

            $pages = acf_options_page()->get_pages();
            $position = array_search($options_name, array_column($pages, 'menu_slug'));
            if ($position > 2) {
                $page = acf_options_page()->get_page( $options_name );
                $parent_slug = str_replace('_', '-', $page['parent_slug']);
                $options_page = $parent_slug . '_page_' . $options_name;
            }

            // Hook to save the options in the correct language, but only when its the footer options page
            add_action('acf/save_post', function () use ($options_page, $permalink) {
                $screen = get_current_screen();
                if ($screen->id === $options_page) {
                    $this->upsert('draft', $permalink);
                }
            }, 100);

            // Add to the total list of endpoints for admin uses
            $this->additional_endpoints[] = $permalink;

            // This is needed, dont rememebr why but it wont work without
            add_action($options_page, function() {
                ob_start();
            }, 1);

            // And here is where we actualy create the placeholder for the box
            add_action($options_page, function() use ($permalink) {
                $content = ob_get_clean();
                $meta_box_object = array( 'args' => array ( 'api_path' => $permalink));
                $custom_metabox = $this->publish_status_meta_box_callback(null, $meta_box_object, false, true);
                $content = str_replace('<div id="submitdiv" class="postbox " >', $custom_metabox . '<div id="submitdiv" class="postbox replace-done">', $content);
                echo $content;
            }, 20);

        }

        // Adds an ACF post settings screen/page so it can be handled by content cerberus
        public function activate_acf_post_settings($options_name, $permalink) {
            $page = acf_options_page()->get_page( $options_name );
            $post_settings_page = $page['post_type'] . '_page_' . $options_name;

            // Hook to save the post settings
            add_action('acf/save_post', function () use ($post_settings_page, $permalink) {
                $screen = get_current_screen();
                if ($screen->id === $post_settings_page) {
                    $this->upsert('draft', $permalink);
                }
            }, 100);

            // Add to the total list of endpoints for admin uses
            $this->additional_endpoints[] = $permalink;

            // This is needed, dont rememebr why but it wont work without
            add_action($post_settings_page, function() {
                ob_start();
            }, 1);

            // And here is where we actualy create the placeholder for the box
            add_action($post_settings_page, function() use ($permalink) {
                $content = ob_get_clean();
                $meta_box_object = array( 'args' => array ( 'api_path' => $permalink));
                $custom_metabox = $this->publish_status_meta_box_callback(null, $meta_box_object, false, true);
                $content = str_replace('<div id="submitdiv" class="postbox " >', $custom_metabox . '<div id="submitdiv" class="postbox replace-done">', $content);
                echo $content;
            }, 20);

        }

        function get_site_id($blog_id = null) {
            if ($blog_id) {
                return get_blog_option($blog_id, 'dls_settings_site_id');
            }
            return $this->site_id;
        }


        function hide_publishing_actions(){
            global $post;
            echo '
                <style type="text/css">
                    #minor-publishing-actions {
                        padding-bottom: .75rem;
                    }
                    #misc-publishing-actions .misc-pub-post-status,
                    #misc-publishing-actions .misc-pub-visibility
                    {
                        display:none;
                    }
                </style>
            ';
        }

        function change_publish_button( $translation, $text ) {
            if ( $text == 'Publish' || $text == 'Update' ) {
                return 'Save to draft';
            }
            return $translation;
        }

        /**
         * Check why this is not working anymore
         */
        // Show another permalink in the edit page view
        function set_correct_permalink($url) {

            $public_host = $this->settings_page->get_overwrite_viewable_permalink();
            $wordpress_url = get_site_url();

            if ($public_host) {
                return str_replace($wordpress_url, $public_host, $url);
            }

            return $url;

        }

        function enqueue_admin_scripts($hook) {
            echo "<script id=\"dls-hooks\" type=\"application/json\">{ \"hook\": \"$hook\" }</script>";
            wp_enqueue_style( 'dls-css', plugins_url( '../css/style.css', __FILE__ ) );
            wp_enqueue_script( 'dls-entry-script', $this->js_script);
        }

        // Break if there is another site id
        public function check_site_id() {
            if (!isset($this->site_id) || $this->site_id === '' ) {
                die();
            }
        }

        public function publish_status_meta_box_callback($post, $meta_box_object, $echo = true, $options_meta = false) {

            $permalink = '';

            if (isset($meta_box_object) && !empty($meta_box_object['args'])) {
                $permalink = $meta_box_object['args']['api_path'];
            } else {
                $permalink = get_permalink($post->ID);
                $permalink = $this->cleanup_permalink($permalink);
            }

            $permalink = str_replace( site_url(), '', $permalink);

            $enable_diff_btn = get_option('dls_settings_enable_diff_viewer');
            $show_diff_button = $enable_diff_btn == 'true' && is_admin() ? 'true' : 'false';

            $require_publication_approval = get_option('dls_settings_require_publication_approval');
            $enable_publication_approval = $require_publication_approval == 'true' ? 'true' : 'false';

            $use_custom_smtp_for_publication_approval = get_option('dls_use_custom_smtp_for_publication_approval') == 'true' ? 'true' : 'false';
            
            $user_has_publication_rights = is_super_admin() ? 'true' : 'false';
            $user = wp_get_current_user();
            $user_name = $user_has_publication_rights ? $user->user_nicename : '';

            $enable_test_content = get_option('dls_settings_enable_test_content');
            $show_test_content = $enable_test_content == 'true' && is_admin() ? 'true' : 'false';

            $post_id = $post ? $post->ID : null;

            $screen = get_current_screen();
            $is_menu_admin = $screen->base === 'nav-menus';

            $options_meta = ($options_meta ? 'true' : 'false');
            $api_url = plugins_url('../api', dirname(__FILE__));
            $output = '<script id="dls-data" type="application/json">{ 
                "optionsMeta": '.$options_meta.', 
                "api": "'.$api_url.'", 
                "postId": "'.$post_id.'", 
                "permalink": "'.$permalink.'", 
                "enableDiffButton": '.$show_diff_button.', 
                "enableTestContent": '.$show_test_content.', 
                "requireApproval": '.$enable_publication_approval.', 
                "userHasPublicationRights": '.$user_has_publication_rights.',
                "useCustomSmtp": '.$use_custom_smtp_for_publication_approval.',
                "userName": "'.$user_name.'"
            }</script>';

            $output .= '<div id="dls-metabox-root"' . ($is_menu_admin ? 'data-type="nav-menu"' : '') . '></div>';

            if ($echo) {
                echo $output;
                return;
            }

            return $output;

        }

        private function check_if_registered_menu_location_permalink($permalink) {
            /**
             * Checks if permalink belongs to a menu with a registered location, e.g. header_menu (and not just by id)
             */
            if (!strpos($permalink, 'menus')) {
                return false;
            }

            if (strpos($permalink, 'menus/byId')) {
                return false;
            }

            return true;
        }

        private function get_menu_permalink_from_registered_menu_location_permalink($permalink) {
            /**
             * Any menu that is registered to a location, e.g. header_menu, is stored in 2 places, e.g.:
             *      menus/header_menu/en
             *      menus/byId/42/en
             *
             * Received permalink is a registered menu link (e.g. /menus/header_menu/ja).
             * From this we fetch the contents (the stored menu).
             * Return the id-based permalink of the menu.
             *
             */

            $content = $this->get_content($permalink);

            if ($content->payload == '404' || empty($content->payload)) {
                error_log('--- check-sync --- Couldn\'t find content with $permalink: ' . $permalink);
                return false;
            }

            $registered_menu_ID = $content->payload->menuId;
            if (!$registered_menu_ID) {
                return false;
            }

            global $sitepress;
            $language = '';

            if (isset($sitepress)) {
                $language = '/' . $sitepress->get_current_language();
            }

            $contentDuplicatePermalink = '/wp-json/content/v1/menus/byId/' . $registered_menu_ID . $language;

            return $contentDuplicatePermalink;
        }

        public function get_enabled_post_types() {
            $post_types = apply_filters('cerberus_post_types', array());
            return $post_types;
        }

        public function meta_box_publish_status() {

            $post_types = $this->get_enabled_post_types();

            add_meta_box(
                'publish-status-meta-box',
                'Publish Status',
                array(&$this, 'publish_status_meta_box_callback'),
                $post_types,
                'side',
                'high'
            );

        }

        public function publish_status_meta_box_callback_pass_args_wrapper($arg){

            $screen = get_current_screen();

            // Dont bother to continue if we dont load a menu
            if ($screen->base !== 'nav-menus') {
                return;
            }

            // Get the menu id from the query string, since I couldnt find another way to get it
            $post_id = isset($_GET['menu']) ? intval($_GET['menu']) : -1;

            // Dont bother to continue if we dont load a menu
            if ($post_id == -1) {
                $menus = get_terms('nav_menu');
                if (isset($menus[0])) {
                    $post_id = $menus[0]->term_id;
                } else {
                    error_log(' --- error: there are no menus ---');
                    // return;
                }
            }

            // If a registered menu, find the location of it
            $is_registered_location = false;
            $menu_location = '';

            foreach( get_nav_menu_locations() as $location => $menu_id ) {
                if( $post_id == $menu_id ){
                    $is_registered_location = true;
                    $menu_location = $location;
                }
            }


            // If the wordpress installation has WPML, handle that as well
            global $sitepress;

            $menu_permalink = '';

            $language = '';
            if (isset($sitepress)) {
                $language = '/' . $sitepress->get_current_language();
            }

            /**
             *
             * Menus with registered locations need to be stored in two locations.
             *      - under their location (e.g. menus/header_menu/ja)
             *      - and according to their unique menu id (e.g. menus/byId/42/ja)
             *
             * For all intents and purposes we ignore the unique id key/permalink until in the final step of publishing/unpublishing
             * the content, where we duplicate the process to make a "copy" on the unique menu id permalink
             *
             */
            if ($is_registered_location) {
                $menu_permalink = '/wp-json/content/v1/menus/' . $menu_location;
            } else {
                $menu_permalink = '/wp-json/content/v1/menus/byId/' . $post_id;
            }

            $permalink = $menu_permalink . $language;

            // We want to pass extra arguments just like add_meta_box() would do to the callback publish_status_meta_box_callback
            $custom_param = array(
                'args' => array(
                    'api_path' => $permalink
                )
            );

            do_action('publish_status_meta_box_navbox', null, $custom_param);

        }

        public function meta_box_publish_status_nav_menus($object) {
            // We must add the meta-box as pure html in the admin footer (fulhacks).
            add_action( 'admin_footer', array($this, 'publish_status_meta_box_callback_pass_args_wrapper'), 10, 2);
            return $object;
        }

        public function delete_post ($post_id) {

            $post = get_post($post_id);

            // we attach this function to the 'save_post' hook
            // so we must check that it's actually a trash
            // before deleting
            if ($post->post_status != 'trash') {
                return;
            }

            $permalink = get_permalink($post->ID);

            error_log(" ---- DELETE_POST ---- permalink: $permalink");

            $this->unpublish('draft', $post_id);
            $this->unpublish('live', $post_id);

        }

        public function pre_publish_term_to_draft($term_id, $taxonomy) {

            $this->pre_term_url = get_tag_link($term_id);
        }

        public function post_publish_term_to_draft($term_id, $tt_id, $taxonomy) {

            $screen = get_current_screen();

            if ($screen->base === 'nav-menus') {
                global $sitepress;

                $language = '';
                if (isset($sitepress)) {
                    $language = '/' . $sitepress->get_current_language();
                }

                $key = '/wp-json/content/v1/menus/byId/' . $term_id . $language;
                $externalId = 'menus-by_id-' . $term_id;

                $this->unpublish('draft', $externalId, $key);
            } else {
                $this->push_to_queue($this->pre_term_url, 'draft', false, 'publish');
            }

        }

        function ajax_get_diff() {
            if (!isset($_POST['post_id'])) {
                exit();
            }

            $post_id = $_POST['post_id'];

            $url = $this->content_draft_url . '/resources/diff/' . $post_id;

            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'Authorization: Bearer ' . $this->api_token,
                'x-site-id:' . $this->site_id
            ));

            $response = curl_exec($ch);

            curl_close($ch);

            $this->send_json($response);
            exit();

        }

        public function send_json($data){
            header("content-type: application/json");
            echo json_encode($data);
        }

        function add_admin_pages() {
            add_menu_page('Cerberus (Context Next)', 'Cerberus', 'manage_options', 'draft-live-sync', function () {
                print '<script id="dls-data" type="application/json">{ "api": "' . plugins_url( '../api', dirname(__FILE__) ) . '"  }</script>';
                print '<div class="wrap">';
                print '<div id="dls-root"/>';
                print '</div>';
            });
            add_menu_page('Domain Settings', 'Domain Settings', 'manage_options', 'cerberus-domain-settings', function () {
                print '<script id="dls-data" type="application/json">{ "api": "' . plugins_url( '../api', dirname(__FILE__) ) . '"  }</script>';
                print '<div class="wrap">';
                print '<div id="dls-domain-settings-root"/>';
                print '</div>';
            });
            
            if (!is_multisite() && get_option( 'dls_settings_require_publication_approval')) {
                add_menu_page('Publication approval', 'Publication approval', 'manage_options', 'publication-approval-dashboard', function () {
                    print '<script id="dls-data" type="application/json">{ "api": "' . plugins_url( '../api', dirname(__FILE__) ) . '"  }</script>';
                    print '<div class="wrap">';
                    print '<div id="dls-publication-approval-root"/>';
                    print '</div>';
                });
            }
        }

        function add_network_admin_pages() {
            if (is_multisite() && get_option( 'dls_settings_require_publication_approval')) {
                add_menu_page('Publication approval', 'Publication approval', 'manage_options', 'publication-approval-dashboard', function () {
                    print '<script id="dls-data" type="application/json">{ "api": "' . plugins_url( '../api', dirname(__FILE__) ) . '"  }</script>';
                    print '<div class="wrap">';
                    print '<div id="dls-publication-approval-root"/>';
                    print '</div>';
                });
            }
        }

        // Constructs a list of urls
        function add_to_complete_url_list($type = 'post') {

            $list = array();
            $posts = get_posts(
                array(

                    'numberposts'       => 10000,
                    'post_type'         => $type,

                    // Make sure that we only return the current language
                    'suppress_filters'  => 0,

                )
            );

            foreach ( $posts as $post ) {

                $permalink = '';

                $permalink = get_permalink($post->ID);

                $permalink = $this->cleanup_permalink($permalink);

                $link_object = new stdclass();
                $link_object->permalink = $permalink;
                $link_object->type = $type;

                array_push($list, $link_object);
            }

            return $list;
        }

        function cleanup_permalink($permalink) {

            if (!isset($permalink) || $permalink == '') {
                return $permalink;
            }

            $permalink = $this->handle_wpml($permalink);

            // Make sure all permalinks are without the domain
            $permalink = str_replace(site_url(), '', $permalink);

            // Replace all domains with the list used in thte settings
            $permalink = $this->replace_hosts($permalink);

            // Remove traling slash but not when the permalink equals '/' (start page)
            $permalink = preg_replace('/(.)\/$/', '$1', $permalink);

            return $permalink;

        }

        function handle_wpml($permalink) {
            // If WPML is activated
            if (function_exists('icl_object_id')) {
                $permalink = apply_filters('wpml_permalink', $permalink, ICL_LANGUAGE_CODE);
                // wpml_permalink adds a / at the end of the permalink
                $permalink = preg_replace('/(.)\/$/', '$1', $permalink);
            }

            return $permalink;
        }

        // function add_tags_to_complete_url_list() {
        //     $list = array();
        //     $tags = get_tags();
        //     foreach ( $tags as $index => $tag ) {

        //         $permalink = get_tag_link( $tag->term_id );
        //         $permalink = $this->cleanup_permalink($permalink);

        //         $link_object = new stdclass();
        //         $link_object->permalink = $permalink;
        //         $link_object->type = 'tag';

        //         array_push($list, $link_object);

        //     }
        //     return $list;
        // }

        function filter_the_content_replace_hosts ( $input ) {

            // If we have a comma separated list of hosts, we replace them as well
            if (getenv("REPLACE_HOST_LIST")) {
                $replace_host_list = explode(',', getenv('REPLACE_HOST_LIST'));
            } else {
                $replace_host_list = array();
            }

            $original_host = get_site_url();

            // We always use the wordpress host too
            array_push($replace_host_list, $original_host);
            array_push($replace_host_list, addcslashes($original_host, '/'));

            // Remove localhost links
            array_push($replace_host_list, addcslashes($original_host, '/'));

            // Get the list of replacable hosts from the settings
            $extra_hosts = $this->settings_page->get_replace_hosts();

            // Merge all lists
            $replace_host_list = array_merge($replace_host_list, $extra_hosts);

            foreach ($replace_host_list as $host) {
                $host = str_replace("\r", '', $host);
                $replace_string = addcslashes($host, '/');
                $input = str_replace($host, '', $input);
                $input = str_replace($replace_string, '', $input);
            }

            // Remove localhost links
            $input = preg_replace('/http(|s):\\\\\/\\\\\/localhost(|:\d+)\\\\\//', '/', $input);

            // Remove links by IP, since we might not know what domain wordpress uses internally
            $input = preg_replace('/http(|s):\\\\\/\\\\\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(|:\d+)\\\\\//', '/', $input);

            return $input;

        }

        public function add_additional_endpoint($endpoint) {
            $this->additional_endpoints[] = $endpoint;
        }

        // This makes sure that the response is cleaned from any hosts that we dont want to use
        public function clean_response($data) {
            $cleaned = $this->filter_the_content_replace_hosts(json_encode($data));
            return rest_ensure_response(json_decode($cleaned));
        }

        function get_all_resources() {

            $list = array();

            $option_permalinks = $this->additional_endpoints;

            foreach ( $option_permalinks as $option_permalink ) {
                $option = new stdclass();
                $option->type = 'option';
                $option->permalink = rtrim($option_permalink, '/');
                array_push($list, $option);
            }

            // Add special footer API call
            $post_types = $this->get_enabled_post_types();

            foreach ( $post_types as $post_type ) {
                $list = array_merge($list, $this->add_to_complete_url_list($post_type));
            }

            // $list = array_merge($list, $this->add_tags_to_complete_url_list());

            return $list;

        }

        function parse_requests ($wp) {

            // if ( is_admin() ) {
            if ($wp->request == 'draft-live-sync/reset') {
                $this->init_push('draft');
                exit();
            }

            if ($wp->request == 'draft-live-sync/publish') {
                $this->init_push('live');
                exit();
            }

        }

    }

}
