<?php

if ( ! class_exists( 'ContentCerberusMenuGenerator' ) ) {

    class ContentCerberusMenuGenerator {

        private $menu_location;
        private $language;

        function __construct() {

        }

        public function get_menu($term_id, $external_id_slug, $language = '') {

            $response = new stdclass();

            $menu_data = get_term($term_id);
            $menu_children = $this->get_menu_json($term_id);

            $response->menuName = $menu_data->name;
            $response->menu = array();
            foreach ($menu_children as $child) {
                $response->menu[] = $this->parse_item($child);
            }

            if ($language != '') {
                $language = '-' . $language;
            }

            $response->type = 'menu';
            $response->parentId = '0';
            $response->externalId = 'menus-' . $external_id_slug . $language;

            $response = apply_filters('cerberus/menu', $response);

            return $response;

        }

        public function get_menu_by_name($menu_location, $language = '') {

            $registered_locations = get_nav_menu_locations();
            
            if(!isset($registered_locations[$menu_location])){
                return new stdclass();
            }

            $selected_menu_object = get_term( $registered_locations[$menu_location], 'nav_menu' );

            $response = $this->get_menu($selected_menu_object->term_id, $menu_location, $language);

            return $response;

        }

        function parse_item($menu) {

            if($menu->children){
                foreach ($menu->children as &$child) {
                    $child = $this->parse_item($child);
                }
            }

            unset($menu->post_author);
            unset($menu->post_date);
            unset($menu->post_date_gmt);
            unset($menu->post_status);
            unset($menu->comment_status);
            unset($menu->ping_status);
            unset($menu->post_password);
            unset($menu->to_ping);
            unset($menu->pinged);
            unset($menu->post_modified);
            unset($menu->post_modified_gmt);
            unset($menu->post_content_filtered);
            unset($menu->post_parent);
            unset($menu->guid);
            unset($menu->post_mime_type);
            unset($menu->comment_count);
            unset($menu->filter);

            if (!isset($menu->ID)) {
                $menu->ID = $menu->post_id;
            }

            $menu = apply_filters('cerberus/menu-item', $menu);

            // Dont return all content, its unnessesary
            unset($menu->post_content);

            $menu->has_children = is_array($menu->children) && count($menu->children) > 0;

            if (!property_exists($menu, 'url')) {
                $url = get_permalink($menu->ID);
                //if (get_page_template_slug($menu->ID) === 'template-anchor-link.php') {
                //$url = rawb_get_page_anchor_link($post_id);
                //}
                $menu->url = $url;
            }

            $menu->url = rtrim($menu->url, '/');

            return $menu;

        }

        function get_menu_json($id){
            $menu = wp_get_nav_menu_items( $id );
            return $this->get_menu_children_from_array($menu);
        }

        function get_menu_children_from_array(&$menu_list, $parent_menu = 0, $post_parent_key_slug = 'menu_item_parent'){

            $children = array();

            if (!is_array($menu_list)) {
                return $children;
            }

            $menu_count = count($menu_list);

            // loop all the existing menu items and splice off children to the current parent
            // also check if the menu item exists (this is relevant in the case where no menu items have children)
            for($i = 0; $i < $menu_count && isset($menu_list[$i]); $i++){
                if( $menu_list[$i]->$post_parent_key_slug == $parent_menu ){
                    $child = (object) array_splice($menu_list, $i , 1)[0];

                    array_push($children, $child);
                    // dont increment if a child is spliced off (index is decreased by 1 from splicing)
                    $i--;
                }
            }

            // if there are any children recurse into their tree and search for grandchildren
            $childrencount = count($children);
            if($childrencount > 0){

                for($i = 0; $i < $childrencount; $i++){

                    $child_hirarchy = $this->get_menu_children_from_array($menu_list, $children[$i]->ID, $post_parent_key_slug);

                    if($child_hirarchy != array()) {
                        $children[$i]->children = $child_hirarchy;
                    }
                }
            }

            return $children;
        }

    }




}
