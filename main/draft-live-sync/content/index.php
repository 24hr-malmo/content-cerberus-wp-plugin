<?php

$dir = dirname( __FILE__ );
require $dir . '/unpublish.php';
require $dir . '/upsert.php';
require $dir . '/copy.php';
require $dir . '/check-sync.php';
require $dir . '/get-content.php';
require $dir . '/recreate-tree.php';
require $dir . '/get-domain-settings.php';
require $dir . '/get-resource-from-content.php';
require $dir . '/unpublish-publication-request.php';

trait ContentTrait {
    use UnpublishTrait;
    use UpsertTrait;
    use CopyTrait;
    use CheckSyncTrait;
    use GetContentTrait;
    use GetDomainSettingsTrait;
    use RecreateTreeTrait;
    use GetResourceFromContentTrait;
    use UnpublishPublicationRequestTrait;
}
