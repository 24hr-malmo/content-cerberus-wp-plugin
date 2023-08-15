<?php

    include 'short-init.php';

    function createEmail($data) {
        error_log('-- publication-approval - Creating email');
        try {
            $approvalStatus = $data['approvalStatus'] ?? false;
            $postTitle = $data['postTitle'] ?? false;
            $admin = $data['admin'] ?? false;
            $rejectionReason = ($approvalStatus === 'rejected' && $data['rejectionReason']) ? $data['rejectionReason'] : false;
            $siteTitle = $data['siteTitle'] ?? false;
            $postUrl = $data['postUrl'] ?? false;
        
            $subject = "Publication " .$approvalStatus. " for \"" .$postTitle. "\"";
        
            $message = "<p>Hello, this is an automated message" .($siteTitle ? " from " .$siteTitle : ""). ",</p>\n\n";
            $message .= "<p>Your request to publish post \"" .$postTitle. "\" was " .$approvalStatus. " by " .$admin. ".</p>\n\n";
            $message .= $rejectionReason ? "<p>Reason for rejection: " .$rejectionReason. "</p>\n\n" : "";
            $message .= "<p><a href='" .$postUrl. "'>View it here.</a></p>\n\n";

            return array(
                'subject' => $subject,
                'message' => $message
            );
        } catch (Exception $e) {
            error_log('-- publication-approval - Error creating mail: ' . $e->getMessage());
            return false;
        }
    }

    function send_approval_status_email( $phpmailer ) {
        $username = getenv('SMTP_USERNAME');
        $password = getenv('SMTP_PASSWORD');
        $host = getenv('SMTP_HOST');
        $port = getenv('SMTP_PORT');
        $fromEmail = getenv('SMTP_FROM_EMAIL');

        $phpmailer->isSMTP();
        $phpmailer->Host       = $host;
        $phpmailer->Port       = $port;
        $phpmailer->SMTPSecure = 'tls';
        $phpmailer->SMTPAuth   = true;
        $phpmailer->Username   = $username;
        $phpmailer->Password   = $password;
        $phpmailer->From       = $fromEmail;
        $phpmailer->FromName   = 'No Reply';
    }

    function send_approval_status_email_content_type() {
        return "text/html";
    }

    try {
        error_log('-- publication-approval - Drafting email');

        $data = $_POST['data'] ?? false;
        $email = createEmail($data);

        $toAddress = $data['editorEmail'] ?? false;
        $subject = $email['subject'];
        $message = $email['message'];

        if (!$toAddress || !$data || !$subject || !$message) {
            throw new Exception('Missing params');
        }

        $useCustomMailSystem = $data['useCustomMailSystem'] === 'true' ?? false;

        if ($useCustomMailSystem) {
            $result = apply_filters('email_publication_approval_verdict_to_editor', $toAddress, $subject, $message, $data);

            if ($result === 'error') {
                throw new Exception('Error sending email');
            }
            
            echo json_encode('success');
        } else {

            // We config the mailer and later unregister the filters and actions so that the default wp_mail() function works as expected.
            // This is because we want this approval feature to work standalone, without configuration of SMTP settings (env variables is all that's needed).
            add_filter( 'wp_mail_content_type','send_approval_status_email_content_type' );
            add_action( 'phpmailer_init', 'send_approval_status_email' );

            $result = wp_mail( $toAddress, $subject, $message );

            remove_filter( 'wp_mail_content_type','send_approval_status_email_content_type' );
            remove_action( 'phpmailer_init', 'send_approval_status_email' );

            error_log('-- publication-approval - Email presumed sent: ' . json_encode($result));
            echo json_encode('success');

        }
    } catch ( Exception $e ) {
        error_log('-- publication-approval - Error sending email: ' .$e->getMessage());
        echo 'error';
    }
    
    exit();