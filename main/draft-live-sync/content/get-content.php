<?php

trait GetContentTrait {

    function get_content($permalink) {

        error_log(' --- get_content : ' . $permalink);

        $data = new stdclass();

        $url = 'http://localhost' . $permalink;

        // We need this to get hthe content beforehand in multisite
        $host = $_SERVER['HTTP_HOST'];

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            "proxy-service: api",
            "host: $host",
        ));

        $payload_response = curl_exec($ch);

        $payload_data = explode("\n", $payload_response);
        $payload_body = array_pop($payload_data);

        // Get all headers
        $payload_headers = array();
        foreach($payload_data as $payload_header_line) {
            $details = explode(':', $payload_header_line, 2);
            if (count($details) == 2) {
                $key   = trim($details[0]);
                $value = trim($details[1]);
                $payload_headers[$key] = $value;
            }
        }

        $data->payload = json_decode($payload_body);
        $data->payload_headers = $payload_headers;

        curl_close ($ch);


        return $data;


    }

}
