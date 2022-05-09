<?php

trait DeleteTermFromDraftTrait {

    /**
    ** this publishes menus
     */
    public function delete_term_from_draft($term_id, $tt_id, $taxonomy) {


        // $this->unpublish('draft', $post_id);
        // $this->unpublish('live', $post_id);

        // $this->push_to_queue($this->pre_term_url, 'draft', false, 'publish');

        error_log(' --- DELETE_TERM_FROM_DRAFT_TRAIT ----- ' . $term_id);

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

        // $this->upsert('draft', $permalink);
        $this->unpublish('draft', $post_id);

    }

}
