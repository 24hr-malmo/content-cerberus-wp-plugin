import { createSignal, onMount, Show } from 'solid-js';
import { styled } from 'solid-styled-components';
import { Heading1, Heading3 } from '../components/heading/heading.jsx';
import { wpAjax } from '../utilities/wp-action.js';
import PublicationRequestItem, { StyledText } from './publication-request-item.jsx';

const StyledStatusList = styled('div')`
    margin-bottom: 3rem;
`;

const StyledSiteList = styled('div')`
    margin-top: 1rem;
    margin-bottom: 2rem;
`;

const StyledDomainHeading = styled('p')`
    font-size: 15px;
`;

const PublicationApprovalDashboard = ({options}) => {

    const [approved, setApproved] = createSignal([]);
    const [pending, setPending] = createSignal([]);
    const [rejected, setRejected] = createSignal([]);
    
    const [loading, setLoading] = createSignal(false);
    const [errorMsg, setErrorMsg] = createSignal('');

    onMount(() => {
        setLoading(true);
        getPublicationRequests();
    })

    const getPublicationRequests = async () => {
        try {
            const result = await wpAjax(`${options.api}/get-publication-requests.php`);
            sortRequests(result?.data?.resources);
        } catch (err) {
            console.log('Error fetching all publication requests', err)
            setErrorMsg('Error fetching all publication requests');
        }
    };

    const deletePublicationRequest = async (postId) => {
        console.log('Deleting publication request: ' + postId);
        try {
            const result = await wpAjax(`${options.api}/delete-publication-request.php`, {
                postId
            });

            console.log('Delete result', result);

            if (result?.errors?.length) {
                throw new Error(result.errors[0]?.message);
            }

            getPublicationRequests();
        } catch (err) {
            console.log('Error deleting publication request', err)
            setErrorMsg('Error deleting publication request');
        }
    };

    const sortRequests = (unsortedRequests = []) => {
        const listsByStatus = {
            pending: {},
            approved: {},
            rejected: {},
        }

        console.log('Unsorted requests', unsortedRequests);

        const requests = unsortedRequests.sort((a, b) => {
            return new Date(b.content.updated_on) - new Date(a.content.updated_on);
        })

        requests.forEach(request => {
            const status = request.content.status;
            const domain = cleanDomain(request.content['wp-domain']);
            const siteTitleAndDomain = request.content.from_site_name + ' - ' + domain;
            
            if (!listsByStatus[status][siteTitleAndDomain]) {
                listsByStatus[status][siteTitleAndDomain] = [];
            }
            
            listsByStatus[status][siteTitleAndDomain].push(request);
        })

        console.log('Approved: ', listsByStatus.approved);
        console.log('Pending: ', listsByStatus.pending);
        console.log('Rejected: ', listsByStatus.rejected);

        setApproved(listsByStatus.approved);
        setRejected(listsByStatus.rejected);
        setPending(listsByStatus.pending);

        setLoading(false);
    }

    const cleanDomain = (domain) => {
        const index = domain.indexOf('://');
        return domain.slice(index + 3)
    }

    const createStatusList = ({title, siteRequests}) => {
        const siteSlugs = Object.keys(siteRequests);

        return (
            <StyledStatusList>
                <Heading3>
                    { title }
                </Heading3>
                <Show
                    when={ siteSlugs.length !== 0 }
                    fallback={ <StyledText>None to show</StyledText> }
                >
                    <For each={ siteSlugs }>{(domain) => (
                        <StyledSiteList>
                            <StyledDomainHeading>{ domain }</StyledDomainHeading>
                            <For each={ siteRequests[domain] }>{(item) => 
                                <PublicationRequestItem
                                    item={ item }
                                    manualDelete={() => deletePublicationRequest(item.content.post_id)}
                                />
                            }</For>
                        </StyledSiteList>
                    )}</For>
                </Show>
            </StyledStatusList>
        )
    }

    return (
        <div>
            <Heading1>Publication requests</Heading1>

            <Show when={loading() && !errorMsg()}>
                <StyledText>Loading...</StyledText>
            </Show>

            <Show when={ !loading() && !errorMsg() }>
                {createStatusList({ title: 'Pending', siteRequests: pending() })}
                {createStatusList({ title: 'Approved', siteRequests: approved() })}
                {createStatusList({ title: 'Rejected', siteRequests: rejected() })}
            </Show>

            <Show when={ errorMsg() }>
                <p>{ errorMsg() }</p>
                <p>Reload page</p>
            </Show>
        </div>
    );

};

export default PublicationApprovalDashboard;

