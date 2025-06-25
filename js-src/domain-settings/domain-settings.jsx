import { createSignal, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Heading1, Heading3 } from '../components/heading/heading.jsx';
import Button from '../components/button/button.jsx';
import Text from '../components/text/text.jsx';
import Input from '../components/input/input.jsx';
import Select from '../components/select/select.jsx';
import {
    StyledAddBox,
    StyledNewDomainInnerContainer,
    StyledNewDomainContainer,
    StyledContainer,
    StyledNewDomainBox,
    StyledNewDomainButtonBox,
    StyledRemoveButton,
    StyledTable,
    StyledTDActions,
    StyledError,
    StyledCheckboxContainer,
    StyledSaveButton,
} from './domain-settings.styled.jsx';
import { wpAjax } from '../utilities/wp-action.js';

const domainRe = /^[a-zA-Z0-9][a-zA-Z0-9-_]{0,61}[a-zA-Z0-9]{0,1}\.([a-zA-Z]{1,6}|[a-zA-Z0-9-]{1,30}\.[a-zA-Z]{2,3})$/;

const targetOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'live', label: 'Live' },
    { value: 'test', label: 'Test' },
];

function makeId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Test cases for sanitizeDomain()
// console.log(sanitizeDomain("https://www.test.com")); // Should return 'test.com'
// console.log(sanitizeDomain("http://test.com/path/to/page")); // Should return 'test.com'
// console.log(sanitizeDomain("www.test.com/anotherpath")); // Should return 'test.com'
// console.log(sanitizeDomain("test.com")); // Should return 'test.com'
// console.log(sanitizeDomain("This is not a domain")); // Should return null
// console.log(sanitizeDomain("www.test.fdsfd.dfs.sdf.sdfcom/another/path")); // Should return 'test.fdsfd.dfs.sdf.sdfcom'
function sanitizeDomain(domain) {
    const domainRegex = /^(?:https?:\/\/)?(?:www\.)?([^\/\n]+)/; // Regular expression to match the domain name or URL
    const match = domain.match(domainRegex);
    // Check if we found a match
    if (match) {
        const potentialDomain = match[1]; // Domain part
        // Validate the extracted part as a domain name (optional)
        // This checks if the potential domain consists of characters allowed in domain names
        if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(potentialDomain)) {
            return potentialDomain; // Return domain name
        } else {
            return null; // Not a valid domain
        }
    } else {
        return null; // Not URL or domain
    }
}

const DomainSettings = ({options}) => {

    const [state, setState] = createStore({list: []});
    const [domain, setDomain] = createSignal('');
    const [cloudfrontDistributionId, setCloudfrontDistributionId] = createSignal('');
    const [target, setTarget] = createSignal('draft');
    const [showCreate, setShowCreate] = createSignal('init');
    const [errorMessage, setErrorMessage] = createSignal('');
    const [saving, setSaving] = createSignal(false);

    const getDomainSettings = async () => {
        const result = await wpAjax(`${options.api}/get-domain-settings.php`);
        /**
         * Sort the result before setting the state.
         * We sort on the key.
         */
        result.sort((a, b) => a.key.localeCompare(b.key));
        setState('list', result);
    };

    const upsert = async (id = makeId(20)) => {
        try {
            const sanitizedDomain = sanitizeDomain(domain());

            if (sanitizedDomain === null) {
                setErrorMessage('Invalid domain. Please enter a valid domain without http(s):// or path.');
                return;
            }

            setErrorMessage('');
            if (saving()) {
                return;
            }
            setSaving(true);
            await wpAjax(`${options.api}/upsert-domain-setting.php`, {
                domain: sanitizedDomain,
                target: target(),
                id,
                cloudfrontDistributionId: cloudfrontDistributionId(),
            });
            await getDomainSettings();
            setTarget('draft');
            setDomain('');
            setCloudfrontDistributionId('');
            setSaving(false);
            setShowCreate('close');
        } catch (err) {
            console.log('ee', err);
            if (err.error === 'domain-already-exists') {
                setErrorMessage('Domain already exists');
            } else {
                setErrorMessage('Something caused an error');
            }
            setSaving(false);
        }
    };

    const deleteEntry = async (id) => {
        try {
            await wpAjax(`${options.api}/delete-domain-setting.php`, {
                id,
            });
            await getDomainSettings();
        } catch (err) {
            console.log(err);
        }
    };

    const updateValue = (name, value) => {

        // For now, just ignore domains that arent valid
        // if (name === 'domain' && !value.match(domainRe)) {
        //     return;
        // }

        if (name === 'domain') {
            setDomain(value);
        }
        if (name === 'target') {
            setTarget(value);
        }
        if (name === 'cloudfrontDistributionId') {
            setCloudfrontDistributionId(value);
        }

    };

    createEffect(() => {
        getDomainSettings();
    });

    // Function to update the doNotIndex property of an item at a specific index.
    const updateDoNotIndexing = async (index, checked) => {
        setSaving(true);
        setState('list', index, 'content', 'doNotIndex', checked);

        const item = state.list[index];
        await upsertState(item.externalId, {
            ...item.content,
            doNotIndex: checked,
        });
        setSaving(false);
    };

    // Function to upsert the current version of the state (store) to the backend.
    const upsertState = async (externalId, content) => {
        const listEntry = state.list.find((item) => item.externalId === externalId);

        if (listEntry) {
            await wpAjax(`${options.api}/upsert-domain-setting.php`, {
                domain: listEntry.content.domain,
                target: listEntry.content.target,
                id: listEntry.externalId,
                cloudfrontDistributionId: listEntry.content.cloudfrontDistributionId,
                doNotIndex: content.doNotIndex,
            });

            await getDomainSettings();
        }
    };

    return (
        <StyledContainer>
            <Heading1>Domain Settings</Heading1>
            <Text>
                This is the list of domains and targets that will be used for this site. You can add as many as you need but the domains need to be pointed to the server to make it work.
            </Text>
            <StyledAddBox>
                <Button onClick={() => setShowCreate('open')}>Add new domain and target</Button>
            </StyledAddBox>
            <StyledNewDomainContainer state={showCreate()}>
                <StyledNewDomainInnerContainer>
                    <Heading3>Add new domain and target</Heading3>
                    <StyledNewDomainBox>
                        <Input placeholder="domain" label="Domain:" value={domain} onChange={(value) => updateValue('domain', value)}/>
                        <Input placeholder="distribution id" label="Cloudfront Distribution ID:" value={cloudfrontDistributionId} onChange={(value) => updateValue('cloudfrontDistributionId', value)}/>
                        <Select options={targetOptions} value={target} onChange={(value) => updateValue('target', value)} />
                    </StyledNewDomainBox>
                    <Show when={errorMessage}><StyledError>{errorMessage}</StyledError></Show>
                    <StyledNewDomainButtonBox>
                        <Button onClick={() => setShowCreate('close')}>Cancel</Button>
                        <Button loading={saving()} leftMargin={true} disabled={!domain() || !target()} onClick={() => upsert()}>Save</Button>
                    </StyledNewDomainButtonBox>
                </StyledNewDomainInnerContainer>
            </StyledNewDomainContainer>
            <StyledTable>
                <thead>
                    <tr>
                        <th>Domain</th>
                        <th>Distribution ID</th>
                        <th>Target</th>
                        <th>SiteId</th>
                        <th>Delete</th>
                        <th>Do not index</th>
                    </tr>
                </thead>
                <tbody>
                    <For each={state.list}>{
                        (item, i) => (
                            <tr>
                                <td>{item.content.domain}</td>
                                <td>{item.content.cloudfrontDistributionId}</td>
                                <td>{item.content.target}</td>
                                <td>{item.content.siteId}</td>
                                <StyledTDActions><StyledRemoveButton onClick={() => deleteEntry(item.externalId)}>delete</StyledRemoveButton></StyledTDActions>
                                <td>
                                    <StyledCheckboxContainer>
                                        <input
                                            type="checkbox"
                                            checked={item.content.doNotIndex}
                                            disabled={saving()}
                                            onChange={(e) => {
                                            /**
                                             * We need to update the state (createStore) with the new value. It should be placed in the content object of the item.
                                             *
                                             * Item in the list example:
                                             *
                                             * {
                                                    "key": "fd.se",
                                                    "externalId": "RgXsMBVmV0lZ4h4gHYeu",
                                                    "content": {
                                                        "target": "draft",
                                                        "siteId": "5hoTwdjPbM",
                                                        "siteName": "Spresense",
                                                        "domain": "fd.se",
                                                        "cloudfrontDistributionId": "",
                                                        "wp-domain": "http://spresense.wp.dupont.sony.local",
                                                        "executionSummary": {
                                                            "contentUsingTags": false
                                                        }
                                                    }
                                                }
                                             */
                                            const checked = e.target.checked;
                                            updateDoNotIndexing(i(), checked);
                                        }}/>
                                    </StyledCheckboxContainer>
                                </td>
                            </tr>
                        )
                    }
                    </For>
                </tbody>
            </StyledTable>
        </StyledContainer>
    );

};

export default DomainSettings;

