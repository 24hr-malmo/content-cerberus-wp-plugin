<?php

trait ReplaceHostsTrait {

    function replace_hosts($permalink) {

        $replaced_permalink = $permalink;

        // If we have a comma separated list of hosts, we replace them as well
        if (getenv("REPLACE_HOST_LIST")) {
            $replace_host_list = explode(',', getenv('REPLACE_HOST_LIST'));
        } else {
            $replace_host_list = array();
        }

        $original_host = get_site_url();

        // We always use the wordpress host too
        array_push($replace_host_list, $original_host);

        // Add the list gathered from the options
        $extra_hosts = $this->settings_page->get_replace_hosts();

        // Merge all lists
        $replace_host_list = array_merge($replace_host_list, $extra_hosts);

        // We always use the wordpress host too
        $original_host = get_site_url();
        array_push($replace_host_list, $original_host);

        foreach ($replace_host_list as $host) {
            $host = preg_replace( "/\r|\n/", "", $host);
            $replace_string = addcslashes($host, '/');
            $replaced_permalink = str_replace($host, '', $replaced_permalink);
            $replaced_permalink = str_replace($replace_string, '', $replaced_permalink);
            // error_log(' REPLACE: ' . $replace_string . ' -- AFTER: ' . $replaced_permalink);
        }

        return $replaced_permalink;

    }

}
