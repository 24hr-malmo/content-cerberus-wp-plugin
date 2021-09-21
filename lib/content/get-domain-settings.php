<?php

trait GetDomainSettingsTrait {

    public function get_domain_settings($only_current_site_id = true, $target = '') {

        $query = <<<'GRAPHQL'
            query resources(
                $siteId: String! 
                $target: String!
            ) {
                resources (
                    siteId: $siteId
                    target: $target
                ) {
                    key
                    externalId
                    content
                }
            }
GRAPHQL;

        $variables = array(
            'siteId' => 'domain-settings',
            'target' => 'domain-settings',
        );

        try {

            $result = graphql_query($this->content_host, $query, $variables);
            $list = $result['data']['resources'];

            if ($only_current_site_id) {
                $site_id = $this->get_site_id();
                $list = array_filter($list, function($value) use ($site_id, $target) {
                    if ($target != '') {
                        return $value['content']['siteId'] == $site_id && $value['content']['target'] == $target;
                    }
                    return $value['content']['siteId'] == $site_id;
                });
            }

            return $list;

        } catch (Exception $e) {
            return $e;
        }

    }

}
