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

                add_action( 'create_term', array( &$this, 'publish_term_to_draft'), 10, 3 );
                add_action( 'edit_term', array( &$this, 'publish_term_to_draft'), 10, 3 );

                add_action( 'pre_delete_term', array( &$this, 'pre_publish_term_to_draft'), 1, 3);
                add_action( 'delete_term', array( &$this, 'post_publish_term_to_draft'), 1, 3);
                add_action( 'wp_ajax_publish_to_live', array( &$this, 'ajax_publish_to_live') );
                add_action( 'wp_ajax_save_to_draft', array( &$this, 'ajax_save_to_draft') );
                add_action( 'wp_ajax_unpublish_from_live', array( &$this, 'ajax_unpublish_from_live') );
                add_action( 'wp_ajax_check_sync', array( &$this, 'ajax_check_sync') );
                add_action( 'wp_ajax_get_diff', array( &$this, 'ajax_get_diff') );
                add_action( 'wp_ajax_reset_tree', array( &$this, 'ajax_reset_tree') );
                add_action( 'wp_ajax_get_all_resources', array( &$this, 'ajax_get_all_resources') );
                add_filter( 'admin_menu', array( &$this, 'add_admin_pages'), 10, 2 );
                add_action( 'parse_request', array( &$this, 'parse_requests'));
                add_filter( 'gettext', array( &$this, 'change_publish_button'), 10, 2 );
                add_filter( 'get_sample_permalink', array( &$this, 'set_correct_permalink'));
                add_filter( 'page_link', array( &$this, 'set_correct_permalink'));
                add_action( 'admin_enqueue_scripts', array(&$this, 'enqueue_admin_scripts' ));
                add_action( 'admin_head-post.php', array( &$this, 'hide_publishing_actions'));
                add_action( 'admin_head-post-new.php', array( &$this, 'hide_publishing_actions'));

                // Filter the content so we can replace hosts etc
                add_filter('dls_replace_hosts', array(&$this, 'filter_the_content_replace_hosts'), 100);

                // Add hook to ACFs save action to publish on each save
                add_action('acf/save_post', array( &$this, 'publish_options_to_draft'), 20, 1);

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

        function get_site_id() {
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

            error_log(' --- set_correct_permalink --- ' . $url);

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

        /**
         * Should be replaced with more specific functions
         */
        // function push_to_queue($permalink, $release = 'draft', $async = false, $status = 'publish', $check_only_draft_live = false, $sync_check = true, $sync_tree_and_cache = true, $custom_payload = false, $custom_payload_headers = false, $dont_fire_actions = false) {

        //     error_log('--- PUSH2QUEUE --' . $permalink . ' - release: ' . $release . ' - status: ' . $status);

        //     $permalink = rtrim($permalink, '/');
        //     $this->check_site_id();

        //     $server_url = $this->content_draft_url . '/content-admin';

        //     if ($release == 'unpublish') {
        //         $server_url = $server_url . '/unpublish';
        //     } else if ($release != 'live') {
        //         $server_url = $server_url . '/queue';
        //     } else {
        //         $server_url = $server_url . '/publish';
        //     }

        //     // $post = get_post($post_id);
        //     // Since WP adds "__trashed_[counter]" to the permalink if its trashed, we need to fix it, otherwise, we cant update the content service correclty
        //     if ($status == 'trash') {
        //      $re = '/__trashed-\d+/';
        //         $permalink = preg_replace($re, '', $permalink);
        //      $re = '/__trashed/';
        //         $permalink = preg_replace($re, '', $permalink);
        //         
        //         /**
        //          * Check if the permalink is pointing to the startpage.
        //          * If it is, we do NOT want to keep going to not risk
        //          * unpublishing it.
        //          */
        //         $is_startpage = wp_make_link_relative($permalink) == '/';
        //         if ($is_startpage) {
        //             return;
        //         }
        //     }
        //     
        //     $data = new stdclass();
        //     
        //     $data->permalink = rtrim($this->replace_hosts($permalink), '/');
        //     $data->sync_check = $sync_check;
        //     $data->sync_tree_and_cache = $sync_tree_and_cache;

        //     error_log('--------------------- ' . $permalink);

        //     $data->async = $async;
        //     $data->release = $release;

        //     if ($check_only_draft_live) {
        //         $data->check_only_draft_live = true;
        //     }

        //     $data->status = $status == 'trash' ? 'deleted' : $status;

        //     // If we provide custom data, use it. This can be used to svae pages that actually dont exist
        //     if ($custom_payload && $custom_payload_headers) {

        //         $data->payload = $custom_payload;
        //         $data->payloadHeaders = $custom_payload_headers;

        //     } else {

        //         // Fetch all data from the page
        //         $content = $this->get_content($data->permalink);

        //         $data->payload = $content->payload;
        //         $data->payloadHeaders = $content->payload_headers;

        //     }

        //     $user = new stdclass();

        //     // In case we load this with short init?
        //     if ( function_exists( 'wp_get_current_user' ) ) {
        //         $user = wp_get_current_user();
        //     }

        //     $variables = array(
        //         'target' => $release,
        //         'userInfo' => strval($user->ID),
        //         'siteId' => $this->site_id,
        //         'resource' => array(
        //             'content' => $data->payload,
        //             'key' => $data->permalink,
        //             'externalId' => $data->id,
        //             'type' => $data->type,
        //             'parentId' => $data->parentId,
        //             'content' => $content->payload,
        //             'host' => 'wordpress',
        //         ),
        //     );

        //     $query = <<<'GRAPHQL'
        //         mutation upsertResource(
        //             $target: String!
        //             $userInfo: String!
        //             $resource: ResourceInstance!
        //             $siteId: String!
        //         ) {
        //             upsertResource (
        //                 target: $target
        //                 siteId: $siteId
        //                 userInfo: $userInfo
        //                 host: "wordpress"
        //                 resource: $resource
        //         ) {
        //             success
        //         }
        //     }
        //     GRAPHQL;

        //     $result = graphql_query('http://content-next/graphql', $query, $variables);

        //     return $result;

        // }

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
            } else if (function_exists('icl_object_id')) {
                $permalink = apply_filters('wpml_permalink', get_permalink($post->ID), ICL_LANGUAGE_CODE);
                $permalink = preg_replace('/(.)\/$/', '$1', $permalink);
            } else {
                $permalink = get_permalink($post->ID);
            }

            $permalink = str_replace( site_url(), '', $permalink);

            $enable_diff_btn = get_option('dls_settings_enable_diff_viewer');
            $show_diff_button = $enable_diff_btn == 'true' && is_admin() ? 'true' : 'false';

            $enable_test_content = get_option('dls_settings_enable_test_content');
            $show_test_content = $enable_test_content == 'true' && is_admin() ? 'true' : 'false';

            // error_log('-- meta box callback --- permalink = ' . $permalink . ' - post: ' . print_r($post, true));

            $post_id = $post ? $post->ID : null;

            $screen = get_current_screen();
            $is_menu_admin = $screen->base === 'nav-menus';

            $output = '<script id="dls-data" type="application/json">{ "optionsMeta": ' . ($options_meta ? 'true' : 'false') . ', "api": "' . plugins_url( '../api', dirname(__FILE__) ) . '", "postId": "' . $post_id . '", "permalink": "' . $permalink . '", "enableDiffButton": ' . $show_diff_button . ', "enableTestContent": ' . $show_test_content . '}</script>';
            $output .= '<div id="dls-metabox-root"' . ($is_menu_admin ? 'data-type="nav-menu"' : '') . '></div>';

            if ($echo) {
                echo $output;
                return;
            }

            return $output;

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

            // Get the menu item, so we can use it to get its location, which is needed to
            // calculate the permalink to send as a key to the content server
            // $menu_item = wp_get_nav_menu_items($menu_id);

            // Find the location of the the current menu
            $menu_location = '';
            foreach( get_nav_menu_locations() as $location => $menu_id ) {
                error_log('--- checking if '. $post_id . ' == ' . $menu_id);
                if( $post_id == $menu_id ){
                    $menu_location = $location;
                }
            }

            if ($menu_location == '') {
                return;
            }

            // If the wordpress installation has WPML, handle that as well
            global $sitepress;
            if (isset($sitepress)) {
                $menu_permalink = '/wp-json/content/v1/menus/header_menu/' . $sitepress->get_current_language();
            } else {
                $menu_permalink = '/wp-json/content/v1/menus/header_menu';
            }

            // We want to pass extra arguments jsut like add_meta_box() would do to the callback publish_status_meta_box_callback
            $custom_param = array(
                'args' => array(
                    'api_path' => $menu_permalink
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

            error_log('delete_post ----- ' . $post_id);

            $this->unpublish('draft', $post_id);
            $this->unpublish('live', $post_id);

        }

        public function pre_publish_term_to_draft($term_id, $tt_id, $taxonomy) {
            $this->pre_term_url = get_tag_link($term_id);
        }

        public function post_publish_term_to_draft($term_id, $tt_id, $taxonomy) {

            error_log('post_publish_term_to_draft ---- ' . $term_id);

            $this->push_to_queue($this->pre_term_url, 'draft', false, 'publish');
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

                // If WPML
                if (function_exists('icl_object_id')) {
                    $permalink = apply_filters('wpml_permalink', get_permalink($post->ID), ICL_LANGUAGE_CODE);
                    $permalink = preg_replace('/(.)\/$/', '$1', $permalink);
                } else {
                    $permalink = get_permalink($post->ID);
                }

                // Make sure all permalinks are without the domain
                $permalink = str_replace( site_url(), "", $permalink);

                // Replace all domains with the list used in thte settings
                $permalink = $this->replace_hosts($permalink);

                $link_object = new stdclass();
                $link_object->permalink = rtrim($permalink, '/');
                $link_object->type = $type;

                array_push($list, $link_object);
            }

            return $list;
        }

        function cleanup_permalink($permalink) {

            if (!isset($permalink) || $permalink == '') {
                return $permalink;
            }

            // Make sure all permalinks are without the domain
            $permalink = str_replace( home_url(), "", $permalink);

            // Replace all domains with the list used in thte settings
            $permalink = $this->replace_hosts($permalink);

            // Remove traling slash
            $permalink = rtrim($permalink, '/');

            if ($permalink === '') {
                $permalink = '/';
            }

            return $permalink;

        }

        function add_tags_to_complete_url_list() {
            $list = array();
            $tags = get_tags();
            foreach ( $tags as $index => $tag ) {

                $permalink = get_tag_link( $tag->term_id );
                $permalink = $this->cleanup_permalink($permalink);

                $link_object = new stdclass();
                $link_object->permalink = $permalink;
                $link_object->type = 'tag';

                array_push($list, $link_object);

            }
            return $list;
        }

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

            $list = array_merge($list, $this->add_tags_to_complete_url_list());

            return $list;

        }


        // Publish all pages to live
        // function init_push($destination = 'draft') {

        //     global $draft_live_sync;

        //     $list = $this->get_all_resources();

        //     if ($destination == 'draft') {
        //         echo '<h2>Reset content for the following permalinks:</h2>';
        //     } else {
        //         echo '<h2>Publish the content for the following permalinks to the live server:</h2>';
        //     }

        //     foreach ( $list as $link_object ) {
        //         error_log('init_push ----- ' . $link_object->permalink);
        //         // $draft_live_sync->push_to_queue($link_object->permalink, $destination); // , false);
        //         $this->upsert($destination, $link_object->permalink);
        //         echo ' > ' . $link_object->permalink . '<br/>';
        //         flush();
        //     }

        //     ob_flush();

        // }

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
