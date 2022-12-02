<?php

trait UpsertTrait {

    public function upsert($target, $permalink = '', $callbacks = array()) {

        $permalink = $this->cleanup_permalink($permalink);
        

        error_log(" ---- UPSERT ---- permalink: $permalink");

        $content = $this->get_content($permalink);
        $newPermalink = apply_filters('enforce_new_permalink', $permalink, $content);

        if ($newPermalink !== $permalink){
            error_log(" ---- UPSERT ---- permalink updated: $newPermalink");
        }


        $externalId = isset($content->payload->externalId) ? $content->payload->externalId : $content->payload->guid;
        if (!$externalId) {
            return;
        }

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
                'key' => $newPermalink,
                'externalId' => $externalId,
                'type' => $content->payload->type,
                'parentId' => strval($content->payload->parentId),
                'order' => isset($content->payload->order) ? $content->payload->order : -1,
                'content' => $content->payload,
                'host' => 'wordpress',
                'tags' => isset($content->payload->tags) ? $content->payload->tags : [],
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
        $result = apply_filters('cerberus_upsert', $result, $target, $permalink);

        return $result;
    }
}
