<?php

trait GetResourcesFromContentTrait {

    public function get_resources_from_content($target, $type) {

        $this->check_site_id();

        $data = new stdclass();

        error_log('--- get_resources_from_content ---');

        if (!$target) {
            error_log('--- get_resources_from_content failed  --- Couldn\'t find $target: ' . $target);
            return;
        }

        if (!$type) {
            error_log('--- get_resources_from_content failed  --- Couldn\'t find $type: ' . $type);
            return;
        }

        $query = <<<'GRAPHQL'
            query resources(
                $siteId: String!
                $target: String!
                $type: [String]
                $limit: Int
            ) {
                resources (
                    siteId: $siteId
                    target: $target
                    type: $type
                    limit: $limit
                ) {
                    externalId
                    key
                }
            }
        GRAPHQL;


        $variables = array(
            'siteId' => $this->site_id,
            'target' => $target,
            'type' => $type,
            'limit' => 10,
        );

        $result = graphql_query($this->content_host, $query, $variables);

        return $result;

    }
}
