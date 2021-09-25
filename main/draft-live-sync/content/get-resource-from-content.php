<?php

trait GetResourceFromContentTrait {

    public function get_resource_from_content($permalink, $target) {

        $this->check_site_id();

        $data = new stdclass();

        $permalink = $this->replace_hosts($permalink);
        // remove trailing slash, but keep single slash which is the start page permalink
        $permalink = preg_replace('/(.)\/$/', '$1', $permalink);

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
