# rawb-wp-draft-sync-plugin
The main plugin for our headless wp integration

## Activating the UI
This plugin is not intended for regular admin users. It is only used by the developers to sync content from the draft to the live site. To activate the UI, you need to click in the bottom left corner of the wordpress sidebar. If you hover your mouse over the corner, you will see it turn orange. Click that area 10 times to reveal the tab for Cerberus.

## Add additional endpoints that should be synced:

In you theme, just add a filter:

```php
// Add additional endpoi9nts specific for this site to draftf sync
function rawb_add_additional_endpoints($list) {
    array_push($list, array('footer', '/json/api/general/footer'));
    array_push($list, array('header', '/json/api/general/header'));
    array_push($list, array('translations', '/json/api/general/translations'));
    array_push($list, array('general', '/json/api/general/general'));
    array_push($list, array('gtm', '/json/api/general/gtm'));
    array_push($list, array('rate-calculator', '/json/api/general/rate-calculator'));
    return $list;
}
add_filter('dls_additional_endpoints', 'rawb_add_additional_endpoints', 10, 1);
```

# Changelog

### [2023-12-12] v0.16.5
* Hide Cerberus plugin for normal users with activation mechanism


### [2023-03-12] v0.15.4
* Added support for auth token for all requests to the content service

### [2020-03-03] v0.10.2
* Fixed a double import in ajax/check-sync.php
* Added filters for publish/unpublish and sync check in for live (used by SONY documentation service)
