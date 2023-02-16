
import { contentStatus } from './publication-approval-store.jsx';
import Button from '../../components/button/button.jsx';

const PublishButton = () => {
    return (
        <Button
            leftMargin={contentStatus.options.metaMenu}
            loading={contentStatus.publishing}
            onClick={(e) => contentStatus.publish(e)}
            disabled={contentStatus.changesNotSavedToDraft}
        >
            { contentStatus.changesNotSavedToDraft 
                ? contentStatus.syncStatus.live?.exists 
                    ? 'Save draft before updating on live'
                    : 'Save draft before publishing to live'
                : contentStatus.syncStatus.live?.exists
                    ? contentStatus.syncStatus.live?.synced
                        ? 'Updated on live site'
                        : 'Update on live site'
                    : 'Publish to live site'
            }
        </Button>
    )
}

export default PublishButton;