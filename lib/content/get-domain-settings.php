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
                $new_list = array();
                foreach($list as $value) {
                    $use = false;
                    if ($target != '') {
                        $use = $value['content']['siteId'] == $site_id && $value['content']['target'] == $target;
                    } else  {
                            $use = $value['content']['siteId'] == $site_id;
                    }
                    if ($use) {
                            $new_list[] = $value;
                    }
                }
                return $new_list;
            }

            return $list;

        } catch (Exception $e) {
            return $e;
        }

    }

}
