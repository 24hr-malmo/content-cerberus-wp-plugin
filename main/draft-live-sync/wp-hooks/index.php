<?php

require_once('wp-insert-post.php');
require_once('publish-term-to-draft.php');
require_once('wp-replace-preview.php');

trait WpHooksTrait {

    use WpInsertPostTrait;
    use WpReplacePreview;
    use PublishTermToDraftTrait;

}
