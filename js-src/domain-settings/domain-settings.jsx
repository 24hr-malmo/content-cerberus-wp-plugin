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

const DomainSettings = ({options}) => {

    const [state, setState] = createStore({list: []});
    const [domain, setDomain] = createSignal('');
    const [cloudfrontDistributionId, setCloudfrontDistributionId] = createSignal('');
    const [target, setTarget] = createSignal('draft');
    const [showCreate, setShowCreate] = createSignal('init');
    const [errorMessage, setErrorMessage] = createSignal('');
    const [saving, setSaving] = createSignal(false);
    const [synking, setSynking] = createSignal(false);

    const getDomainSettings = async () => {
        const result = await wpAjax(`${options.api}/get-domain-settings.php`);
        setState('list', result);
    };

    const upsert = async (id = makeId(20)) => {
        try {
            setErrorMessage('');
            if (saving()) {
                return;
            }
            setSaving(true);
            await wpAjax(`${options.api}/upsert-domain-setting.php`, {
                domain: domain(),
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

    const syncWithUserService = async () => {
        setSynking(true);
        try {
            await wpAjax(`${options.api}/trigger-sync-event.php`);
        } catch (err) {
            console.log(err);
        }
        setSynking(false);
    };

    createEffect(() => {
        getDomainSettings();
    });

    return (
        <StyledContainer>
            <Heading1>Domain Settings</Heading1>
            <Text>
                This is the list of domains and targets that will be used for this site. You can add as many as you need but the domains need to be pointed to the server to make it work.
            </Text>
            <StyledAddBox>
                <Button loading={saving() || synking()} onClick={() => syncWithUserService()}>Sync with User Service</Button>
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
                    <th></th>
                </tr>
               </thead>
               <tbody>
                     <For each={state.list}>{
                        (item) => (
                            <tr>
                                <td>{item.content.domain}</td>
                                <td>{item.content.cloudfrontDistributionId}</td>
                                <td>{item.content.target}</td>
                                <td>{item.content.siteId}</td>
                                <StyledTDActions><StyledRemoveButton onClick={() => deleteEntry(item.externalId)}>delete</StyledRemoveButton></StyledTDActions>
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

