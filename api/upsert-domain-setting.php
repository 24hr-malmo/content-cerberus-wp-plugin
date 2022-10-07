<?php

    include 'short-init.php';

    if(class_exists( 'DraftLiveSync' )){

        // Init or use instance of the manager.
        $dir = dirname( __FILE__ );
        $content_host = getenv('CONTENT_HOST');
        $api_token = getenv('API_TOKEN');

        $draft_live_sync = new DraftLiveSync($dir, 'ajax-version', $content_host, $api_token, true);

        $user = new stdclass();

        // In case we load this with short init?
        if ( function_exists( 'wp_get_current_user' ) ) {
            $user = wp_get_current_user();
        }

        $domain = $_POST['domain'];
        $target = $_POST['target'];
        $cloudfront_distribution_id = $_POST['cloudfrontDistributionId'];
        $id = $_POST['id'];

        $domain_settings = $draft_live_sync->get_domain_settings(false);

        $ok = true;
        foreach($domain_settings as $domain_setting) {
            if ($domain_setting['content']['domain'] == $domain && $domain_setting['externalId'] != $id) {
                http_response_code(400);
                $result = array(
                    "error" => "domain-already-exists"
                );
                echo json_encode($result);
                exit();
            }
        }

        global $blog_id;
        if ( is_multisite() ) {
            $current_blog_details = get_blog_details( array( 'blog_id' => $blog_id) );
        } else {
            $current_blog_details = new stdClass();
            $current_blog_details->blogname = '';
        }

        $variables = array(
            'target' => 'domain-settings',
            'userInfo' => strval($user->ID),
            'siteId' => 'domain-settings',
            'resource' => array(
                'key' => $domain,
                'externalId' => $id,
                'type' => 'domain-setting',
                'content' => array(
                    'target' => $target,
                    'siteId' => $draft_live_sync->get_site_id(),
                    'siteName' => $current_blog_details->blogname,
                    'domain' => $domain,
                    'cloudfrontDistributionId' => $cloudfront_distribution_id,
                    'wp-domain' => get_site_url(),
                ),
                'host' => 'wordpress',
            ),
        );

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

        try {

            $result = graphql_query($draft_live_sync->content_host, $query, $variables);

            echo json_encode($result);

        } catch (Exception $e) {

        }

        //Don't forget to always exit in the ajax function.
        exit();

    } else {
        error_log('DLS CLASS DOES NOT EXIST!!!!');
    }
