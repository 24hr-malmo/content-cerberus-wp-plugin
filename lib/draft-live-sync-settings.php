<?php

    class DraftLiveSyncSettings {

        private $options;
        private $draft_live_sync;

        private $ignore_post_types = array(
            'attachment',
            'revision',
            'nav_menu_item', 
            'custom_css', 
            'customize_changeset', 
            'acf-field-group', 
            'acf-field', 
            'vc4_templates', 
            'vc_grid_item', 
            'templatera', 
            'np-redirect', 
            'oembed_cache',
        );

        public function __construct($draft_live_sync) {
            $this->draft_live_sync = $draft_live_sync;

            add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
            add_action( 'admin_init', array( $this, 'page_init' ) );
        }

        public function get_site_id() {
            $value = get_option( 'dls_settings_site_id' );
            return $value;
        }

        public function set_site_id($value) {
            update_option( 'dls_settings_site_id', $value );
        }

        public function get_replace_hosts() {
            $value = get_option( 'dls_settings_replace_host_list' );
            $list = explode("\n", $value);
            return $list;
        }

        public function get_auto_redirect_to_admin_page() {
            $value = get_option( 'dls_settings_auto_redirect_to_admin_page' ) == 'true';
            return $value;
        }

        public function get_overwrite_viewable_permalink() {
            $value = get_option( 'dls_overwrite_viewable_permalink' ) == 'true';
            if ($value) {
                return get_option( 'dls_overwrite_viewable_permalink_host' );
            }
            return false;
        }

        public function add_plugin_page() {
            add_submenu_page('draft-live-sync', 'Settings', 'Settings', 'manage_options', 'draft-live-sync-settings', array( &$this, 'create_admin_page'));
        }

        public function create_admin_page() {

            $this->options = get_option( 'my_option_name' );
?>
        <div class="wrap">
            <h1>Draft Live Sync Settings</h1>

            <div>
                <h2>Enviroment variables</h2>
                <div>Internal Content URL: <strong><?php echo $this->draft_live_sync->content_host; ?></strong></div>
            </div>

            <form method="post" action="options.php">
<?php
            // This prints out all hidden setting fields
            settings_fields( 'my_option_group' );
            do_settings_sections( 'my-setting-admin' );
            submit_button();
?>
            </form>
        </div>
<?php
        }

        /**
         * Register and add settings
         */
        public function page_init() {        

            if (!get_option('dls_settings_site_id')) {
                add_option('dls_settings_site_id');
            }

            if (!get_option('dls_settings_replace_host_list')) {
                add_option('dls_settings_replace_host_list');
            }

            if (!get_option('dls_settings_auto_redirect_to_admin_page')) {
                add_option('dls_settings_auto_redirect_to_admin_page');
            }

            if (!get_option('dls_overwrite_viewable_permalink')) {
                add_option('dls_overwrite_viewable_permalink');
            }

               if (!get_option('dls_overwrite_viewable_permalink_host')) {
                add_option('dls_overwrite_viewable_permalink_host');
            }
     
               if (!get_option('dls_settings_enable_diff_viewer')) {
                add_option('dls_settings_enable_diff_viewer');
            }

               if (!get_option('dls_settings_enable_test_content')) {
                add_option('dls_settings_enable_test_content');
            }
      
            register_setting( 'my_option_group', 'dls_settings_site_id', array( $this, 'sanitize' ) );
            register_setting( 'my_option_group', 'dls_settings_replace_host_list', array( $this, 'sanitize' ) );
            register_setting( 'my_option_group', 'dls_settings_auto_redirect_to_admin_page', array( $this, 'sanitize' ) );
            register_setting( 'my_option_group', 'dls_settings_enable_diff_viewer', array( $this, 'sanitize' ) );
            register_setting( 'my_option_group', 'dls_settings_enable_test_content', array( $this, 'sanitize' ) );
            register_setting( 'my_option_group', 'dls_overwrite_viewable_permalink', array( $this, 'sanitize' ) );
            register_setting( 'my_option_group', 'dls_overwrite_viewable_permalink_host', array( $this, 'sanitize' ) );

            add_settings_section( 'settings_site_id', 'Site ID', array( $this, 'print_site_id' ), 'my-setting-admin' );  

            add_settings_section( 'setting_section_id', 'Enabled post types:', array( $this, 'print_post_types_info' ), 'my-setting-admin' );  

            add_settings_section( 'settings_replace_hosts', 'Hosts to replace', array( $this, 'print_replace_hosts_info' ), 'my-setting-admin' );  
            add_settings_field( 'dls-settings', 'List of hosts', array( $this, 'replace_hosts_callback'), 'my-setting-admin', 'settings_replace_hosts' );      

            add_settings_section( 'settings_auto_redirect_to_admin', 'Auto redirect to admin page', array( $this, 'print_auto_redirect_to_admin' ), 'my-setting-admin' );  
            add_settings_field( 'dls-settings', 'Auto redirect to admin page', array( $this, 'auto_redirect_to_admin_callback'), 'my-setting-admin', 'settings_auto_redirect_to_admin' );      
            
            add_settings_section( 'settings_enable_diff_viewer', 'Enable the diff button?', array( $this, 'print_enable_diff_viewer' ), 'my-setting-admin' );  
            add_settings_section( 'settings_enable_diff_viewer', 'Enable the diff button?', array( $this, 'enable_diff_viewer_callback' ), 'my-setting-admin' );  

            add_settings_section( 'settings_enable_test_content', 'Enable the test content target?', array( $this, 'print_enable_test_content' ), 'my-setting-admin' );  
            add_settings_section( 'settings_enable_test_content', 'Enable the test content target?', array( $this, 'enable_test_content_callback' ), 'my-setting-admin' );  
                
            add_settings_section( 'settings_overwrite_viewable_permalink', 'Overwrite the viewable permalink', array( $this, 'print_overwrite_viewable_permalink' ), 'my-setting-admin' );  
            add_settings_field( 'dls-settings', 'Overwrite the viewable permalink', array( $this, 'overwrite_viewable_permalink_callback'), 'my-setting-admin', 'settings_overwrite_viewable_permalink' );      
            add_settings_field( 'dls-settings-overwrite_viewable_permalink_host', 'Overwrite the viewable permalink host', array( $this, 'overwrite_viewable_permalink_host_callback'), 'my-setting-admin', 'settings_overwrite_viewable_permalink' );      

        }

        public function sanitize( $input ) {
            $new_input = array();
            if( isset( $input['id_number'] ) )
                $new_input['id_number'] = absint( $input['id_number'] );

            if( isset( $input['title'] ) )
                $new_input['title'] = sanitize_text_field( $input['title'] );

            return $input;
        }

        public function print_site_id() {
            $value = get_option( 'dls_settings_site_id' );
            print "<div style='padding-bottom: 16px; font-size: 16px'>The site_id for this site is: <strong>$value</string></div>";
        }

        public function print_post_types_info() {
            print "<div style='padding-bottom: 16px;'>";
            $post_types = $this->draft_live_sync->get_enabled_post_types(); 
            foreach ( $post_types as $post_type ) {
                if (!in_array($post_type, $this->ignore_post_types)) {
                    printf(
                        "<div>$post_type</div>"
                    );
                }
            }
            print "</div>";
        }

        public function print_replace_hosts_info() {
            print 'List of all hosts that should be removed. One per line. Important: Be careful with this replace/remove functionality. It will remove all instances of the text.';
        }

        public function print_auto_redirect_to_admin() {
            print 'Should we automatically redirect to the admin page?';
        }

        public function print_overwrite_viewable_permalink() {
            print 'If we want to overwrite the vieable permalink when editing a page, this is where to do it';
        }

        public function print_enable_diff_viewer() {
            print 'If the diff button should be available to use.';            
        }

        public function print_enable_test_content() {
            print 'If the test content target should be available to use.';            
        }

        public function replace_hosts_callback() {
            $value = get_option( 'dls_settings_replace_host_list' );
            echo "<div><textarea style=\"width: 50%; height: 200px;\" name=\"dls_settings_replace_host_list\" />$value</textarea></div>";
        }

        public function auto_redirect_to_admin_callback() {

            $value = get_option( 'dls_settings_auto_redirect_to_admin_page');
            $checked = $value == 'true' ? ' checked' : '';
            printf("<div><input type=\"checkbox\" name=\"dls_settings_auto_redirect_to_admin_page\" value=\"true\" $checked/> Yes</div>");

        }

        public function enable_diff_viewer_callback() {

            $value = get_option( 'dls_settings_enable_diff_viewer');
            $checked = $value == 'true' ? ' checked' : '';
            printf("<div><input type=\"checkbox\" name=\"dls_settings_enable_diff_viewer\" value=\"true\" $checked/> Yes</div>");

        }

        public function enable_test_content_callback() {

            $value = get_option( 'dls_settings_enable_test_content');
            $checked = $value == 'true' ? ' checked' : '';
            printf("<div><input type=\"checkbox\" name=\"dls_settings_enable_test_content\" value=\"true\" $checked/> Yes</div>");

        }

        public function overwrite_viewable_permalink_callback() {
            $value = get_option( 'dls_overwrite_viewable_permalink' );
            $checked = $value == 'true' ? ' checked' : '';
            printf("<div><input type=\"checkbox\" name=\"dls_overwrite_viewable_permalink\" value=\"true\" $checked/> Yes</div>");
        }

        public function overwrite_viewable_permalink_host_callback() {
            $value = get_option( 'dls_overwrite_viewable_permalink_host' );
            printf("<div><input style=\"width: 400px\" type=\"text\" name=\"dls_overwrite_viewable_permalink_host\" value=\"$value\" /></div>");
        }

    }

