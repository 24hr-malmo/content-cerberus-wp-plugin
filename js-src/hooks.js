const init = () => {

    if (wp.data) {

        let lastIsSaving = false;
        let lastIsSavingOther = false;

        wp.data.subscribe(() => {

            const isSavingPost = wp.data.select('core/editor').isSavingPost();
            const isSavingNonPostEntityChanges = wp.data.select('core/editor').isSavingNonPostEntityChanges();

            if (lastIsSaving !== isSavingPost) {

                // This is to check if the post has been saved
                lastIsSaving = isSavingPost
                const isSaved = wp.data.select('core/editor').didPostSaveRequestSucceed();
                if (isSaved) {
                    wp.hooks.doAction('dls.post-saved');
                }

            } else if (lastIsSavingOther !== isSavingNonPostEntityChanges) {

                // This is to check if we saved a reusable block
                lastIsSavingOther = isSavingNonPostEntityChanges
                const isSaved = wp.data.select('core/editor').didPostSaveRequestSucceed();
                if (isSaved) {
                    wp.hooks.doAction('dls.post-saved');
                }

            }

         });

    }

};

export default init;
