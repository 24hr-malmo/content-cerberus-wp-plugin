<?php

require_once('ajax-check-sync.php');
require_once('ajax-save-to-draft.php');
require_once('ajax-publish-to-live.php');
require_once('ajax-unpublish-from-live.php');
require_once('ajax-get-all-resources.php');
require_once('ajax-reset-tree.php');
require_once('ajax-get-header-menus-debug.php');
require_once('ajax-get-header-menus-legacy-debug.php');

trait AjaxTrait {

    use AjaxCheckSyncTrait;
    use AjaxSaveToDraftTrait;
    use AjaxPublishToLiveTrait;
    use AjaxUnpublishFromLiveTrait;
    use AjaxGetAllResourcesTrait;
    use AjaxResetTreeTrait;
    use AjaxGetHeaderMenusDebugTrait;
    use AjaxGetHeaderMenusLegacyDebugTrait;

}
