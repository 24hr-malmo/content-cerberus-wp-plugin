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

export const StyledTabs = styled('div')`
    width: 100%;
    border-bottom: solid 2px #c3c4c7;
    height: 2rem;
    display: flex;
    align-items: flex-end;
`;

export const StyledContent = styled('div')`
    background-color: white;
    width: 100%;
    padding: 2rem 1rem;
    box-sizing: border-box;
    border: solid 2px #c3c4c7;
    border-top: none;
`;

export const StyledTab = styled('button')`
    padding: 1rem;
    border: solid 1px #c3c4c7;
    border-bottom: solid 2px #c3c4c7;
    margin-left: 4px;
    border-radius: 3px 3px 0 0;
    transition: all 0.3s ease-in-out;
    transform: translateY(2px);
    cursor: pointer;
    background-color: #f0f0f1;

    ${(props) =>
        props.isActive &&
        `
        border-bottom: solid 2px transparent;
        background-color: white;
    `}
`;

const tabs = [
    { slug: 'pending', name: 'Pending' },
    { slug: 'approved', name: 'Approved' },
    { slug: 'approvedAndPublished', name: 'Published' },
    { slug: 'rejected', name: 'Rejected' },
];

const PublicationApprovalDashboard = ({options}) => {

    const [approved, setApproved] = createSignal([]);
    const [approvedAndPublished, setApprovedAndPublished] = createSignal([]);
    const [pending, setPending] = createSignal([]);
    const [rejected, setRejected] = createSignal([]);
    
    const [loading, setLoading] = createSignal(false);
    const [errorMsg, setErrorMsg] = createSignal('');
    const [activeTab, setActiveTab] = createSignal('pending');

    onMount(() => {
        setLoading(true);
        getPublicationRequests();
    });

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
            approvedAndPublished: {},
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
        });

        console.log('Approved: ', listsByStatus.approved);
        console.log('Approved And Published: ', listsByStatus.approvedAndPublished);
        console.log('Pending: ', listsByStatus.pending);
        console.log('Rejected: ', listsByStatus.rejected);

        setApproved(listsByStatus.approved);
        setApprovedAndPublished(listsByStatus.approvedAndPublished);
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
                <Heading3>{title}</Heading3>
                <Show
                    when={siteSlugs.length !== 0}
                    fallback={<StyledText>None to show</StyledText>}
                >
                    <For each={siteSlugs}>
                        {(domain) => (
                            <StyledSiteList>
                                <StyledDomainHeading>{domain}</StyledDomainHeading>
                                <For each={siteRequests[domain]}>
                                    {(item) => (
                                        <PublicationRequestItem
                                            item={item}
                                            manualDelete={() => deletePublicationRequest(item.content.post_id)}
                                            type={'admin'}
                                        />
                                    )}
                                </For>
                            </StyledSiteList>
                        )}
                    </For>
                </Show>
            </StyledStatusList>
        );
    };

    return (
        <div>
            <Heading1>Publication requests</Heading1>

            <StyledTabs>
                <For each={tabs}>
                    {(tab, i) => (
                        <StyledTab
                            isActive={tab.slug === activeTab()}
                            onClick={() => setActiveTab(tab.slug)}
                        >
                            {tab.name}
                        </StyledTab>
                    )}
                </For>
            </StyledTabs>

            <StyledContent>
                <Show when={loading() && !errorMsg()}>
                    <StyledText>Loading...</StyledText>
                </Show>

                <Show when={activeTab() === 'pending' && !loading() && !errorMsg()}>
                    {createStatusList({ title: 'Pending', siteRequests: pending() })}
                </Show> 
                <Show when={activeTab() === 'approved' && !loading() && !errorMsg()}>
                    {createStatusList({ title: 'Approved', siteRequests: approved() })}
                </Show>
                <Show when={activeTab() === 'approvedAndPublished' && !loading() && !errorMsg()}>
                    {createStatusList({ title: 'Published', siteRequests: approvedAndPublished() })}
                </Show>
                <Show when={activeTab() === 'rejected' && !loading() && !errorMsg()}>
                    {createStatusList({ title: 'Rejected', siteRequests: rejected() })}
                </Show>

                <Show when={errorMsg()}>
                    <p>{errorMsg()}</p>
                    <p>Reload page</p>
                </Show>
            </StyledContent>
        </div>
    );

};

export default PublicationApprovalDashboard;

