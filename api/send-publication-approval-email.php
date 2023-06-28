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
            error_log('-- publication-approval - Using custom mail system');
            $result = apply_filters('email_publication_approval_verdict_to_editor', $toAddress, $subject, $message, $data);
            if ($result === 'error') {
                throw new Exception('Error sending email');
            }
            
            echo json_encode('success');
        } else {
            wp_mail( $toAddress, $subject, $message );
            error_log('-- publication-approval - Email sent!');
            echo json_encode('success');
        }
    } catch ( Exception $e ) {
        error_log('-- publication-approval - Error sending email: ' .$e->getMessage());
        echo 'error';
    }
    
    exit();