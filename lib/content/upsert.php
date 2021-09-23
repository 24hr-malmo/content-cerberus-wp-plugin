<?php

trait UpsertTrait {

    public function upsert($target, $permalink = '', $callbacks = array()) {

        error_log('Upsert - target: ' . $target . ' - permalink: ' . $permalink);

        // Fetch all data from the page
        $permalink = $this->replace_hosts($permalink);
        // remove trailing slash, but keep single slash which is the start page permalink
        $permalink = preg_replace('/(.)\/$/', '$1', $permalink);

        // globals
		global $sitepress;
        global $post_type;

        $langSuffix = '';

        if ($post_type != 'page' && isset($sitepress)) {
            $current_language = $sitepress->get_current_language();
            $default_language = $sitepress->get_default_language();

            if ($current_language != $default_language) {
                $langSuffix = '-' . $current_language;
                $permalink = '/' . $current_language . $permalink;
            }
        }

        // error_log('---------------' . $permalinkl);

        $content = $this->get_content($permalink);

        $user = new stdclass();

        // In case we load this with short init?
        if ( function_exists( 'wp_get_current_user' ) ) {
            $user = wp_get_current_user();
        }

        $variables = array(
            'target' => $target,
            'userInfo' => strval($user->ID),
            'siteId' => $this->site_id,
            'resource' => array(
                'key' => $permalink,
                'externalId' => $content->payload->guid . $langSuffix,
                'type' => $content->payload->type,
                'parentId' => strval($content->payload->parentId),
                'order' => isset($content->payload->order) ? $content->payload->order : -1,
                'content' => $content->payload,
                'host' => 'wordpress',
            ),
        );

        error_log(print_r($variables, true));

        if ($callbacks['content'] && is_callable($callbacks['content'])) {
            $callbacks['content']($variables);
        }

        $query = <<<'GRAPHQL'
            mutation upsertResource(
                $target: String!
                $userInfo: String!
                $resource: ResourceInstance!
                $siteId: String!
            ) {
                upsertResource (
                    target: $target
                    siteId: $siteId
                    userInfo: $userInfo
                    host: "wordpress"
                    resource: $resource
            ) {
                success
            }
        }
        GRAPHQL;

        $result = graphql_query($this->content_host, $query, $variables);

        return $result;
    }
}
