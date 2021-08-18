<?php

trait PublishTermToDraftTrait {

    /**
    ** this publishes menus
     */
    public function publish_term_to_draft($term_id, $tt_id, $taxonomy) {

        error_log(' --- PUBLISH_TERM_TO_DRAFT ----- ' . $term_id);

        $permalink = get_tag_link($term_id);

        error_log(' --- term permalink --- ' . $permalink);

        $term = get_term($term_id);

        error_log(' --- term ---' . print_r($term, true));

        if ($term->taxonomy !== 'category' || $term->taxonomy !== 'tag') {
            return;
        }

        // This check is to make sure that no url for a term can pass as the startpage of the site
        // which happens if we save the menus and the permalink is generated with
        // a querystring.
        $withoutQuery = strtok($permalink, '?');
        $withoutQuery = $this->replace_hosts($withoutQuery);
        if ($withoutQuery == '/') {
            return;
        }

        $this->upsert('draft', $permalink);

    }

}
