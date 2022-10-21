<?php

trait GetResourceFromContentTrait {

    public function get_resource_from_content($permalink, $target) {

        $this->check_site_id();

        $permalink = $this->cleanup_permalink($permalink);

        $query = <<<'GRAPHQL'
            query getResource(
                $siteId: String!
                $target: String!
                $key: String!
            ) {
                resource (
                    siteId: $siteId
                    target: $target
                    key: $key
                ) {
                    content
                }
            }
        GRAPHQL;

        $variables = array(
            'siteId' => $this->site_id,
            'target' => $target,
            'key' => $permalink,
            'autopopulate' => false,
        );

        $result = graphql_query($this->content_host, $query, $variables);

        return $result;

    }
}
