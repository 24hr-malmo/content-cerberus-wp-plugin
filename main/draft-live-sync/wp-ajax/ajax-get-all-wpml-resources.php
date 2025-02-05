<?php

trait AjaxGetAllWpmlResourcesTrait {

    public function ajax_get_all_wpml_resources() {

        error_log('--- ajax_get_all_wpml_resources ---');

        global $sitepress;

        if (isset($sitepress)) {

            error_log('--- ajax_get_all_wpml_resources sitepress ---');

            $currentLang = $sitepress->get_current_language();
            $activeLanguages = $sitepress->get_active_languages();

            // Array keys
            $languageCodes = array_keys($activeLanguages);

            $result = [];

            foreach ($languageCodes as $languageCode) {
                $sitepress->switch_lang($languageCode);

                // Append all $this->get_all_resources() to $result array, one big array with all resources
                $result[$languageCode] = $this->get_all_resources();
            }

            // Back to the original language
            $sitepress->switch_lang($currentLang);

            $json = json_encode($result);
            header('Content-Type: application/json');
            echo $json;

            // $response = $this->get_resources_from_content($target, $type);
            // error_log('--- ajax_get_all_wpml_resources ---' . json_encode($response));

            // header( "Content-Type: application/json" );
            // echo json_encode($response);

            // global $sitepress;

            // if (isset($sitepress)) {

            //     $post_id = $_POST['postId'];

            //     $post_type = get_post_type($post_id);

            //     $current_lang = $sitepress->get_current_language(); //save current language

            //     $sitepress->switch_lang($_POST['language']);

            //     $result = new stdclass();
            //     $result->list = $this->get_all_lang_resources($post_type);

            //     $sitepress->switch_lang($current_lang); //restore previous language

            // }

            exit();
        }
    }
}
