<?php
function graphql_query(string $endpoint, string $query, array $variables = [], $token = null) {

    try {

        $headers = ['Content-Type: application/json', 'User-Agent: grapqh-client'];
        if (null !== $token) {
            $headers[] = "Authorization: Bearer $token";
        }

        if (false === $data = @file_get_contents($endpoint, false, stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => $headers,
                'content' => json_encode(['query' => $query, 'variables' => $variables]),
            ]
        ]))) {
            $error = error_get_last();
            error_log(print_r($error, true));
            throw new ErrorException($error['message'], $error['type']);
        }

    } catch (Exception $e) {
            // error_log(print_r($e, true));
            throw new Exception('Error sending graphql query');
    }


    return json_decode($data, true);
}

