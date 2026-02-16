import { createSignal, createEffect, Show, For } from "solid-js";
import { wpAjaxAction } from '../../utilities/wp-action.js';
import Page from '../../components/page/page.jsx';
import PageTop from '../../components/page-top/page-top.jsx';
import Button from '../../components/button/button.jsx';

const MenusDebug = () => {

    const [headerMenuData, setHeaderMenuData] = createSignal(null);
    const [legacyMenuData, setLegacyMenuData] = createSignal(null);
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal(null);

    // Auto-load debug data when component mounts
    createEffect(async () => {
        await loadDebugData();
    });

    const loadDebugData = async () => {
        setLoading(true);
        setError(null);

        try {
            // Load current language-specific menu data
            const currentResult = await wpAjaxAction('get_header_menus_debug', {});
            setHeaderMenuData(currentResult);
            console.log('Header menu debug data:', currentResult);

            // Load legacy menu data
            const legacyResult = await wpAjaxAction('get_header_menus_legacy_debug', {});
            setLegacyMenuData(legacyResult);
            console.log('Legacy header menu debug data:', legacyResult);
        } catch (err) {
            console.error('Failed to load header menu debug data:', err);
            setError(err?.message || 'Failed to load data');
            setHeaderMenuData(null);
            setLegacyMenuData(null);
        } finally {
            setLoading(false);
        }
    };

    const MenuTable = (props) => (
        <div style="overflow-x: auto;">
            <table style="width: 100%; background: white; border-collapse: collapse; font-size: 13px;">
                <thead>
                    <tr style="background: #f8f8f8; border-bottom: 2px solid #ddd;">
                        <th style="padding: 12px; text-align: left; font-weight: 600;">Language</th>
                        <th style="padding: 12px; text-align: left; font-weight: 600;">WP Menu ID</th>
                        <th style="padding: 12px; text-align: left; font-weight: 600;">WP Menu Name</th>
                        <th style="padding: 12px; text-align: left; font-weight: 600;">WP Permalink</th>
                        <th style="padding: 12px; text-align: left; font-weight: 600;">Draft ExternalId</th>
                        <th style="padding: 12px; text-align: left; font-weight: 600;">Draft Key</th>
                        <th style="padding: 12px; text-align: left; font-weight: 600;">Live ExternalId</th>
                        <th style="padding: 12px; text-align: left; font-weight: 600;">Live Key</th>
                    </tr>
                </thead>
                <tbody>
                    <For each={props.menus || []}>
                        {(menu) => (
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 10px; font-weight: 500;">{menu.language}</td>
                                <td style="padding: 10px; font-family: monospace;">{menu.wp_menu_id}</td>
                                <td style="padding: 10px;">{menu.wp_menu_name}</td>
                                <td style="padding: 10px; font-family: monospace; font-size: 11px; color: #666;">
                                    {menu.wp_permalink}
                                </td>
                                <td style="padding: 10px; font-family: monospace; font-size: 11px;">
                                    {menu.draft_external_id || <span style="color: #999; font-style: italic;">NULL</span>}
                                </td>
                                <td style="padding: 10px; font-family: monospace; font-size: 11px; color: #666;">
                                    {menu.draft_key || <span style="color: #999; font-style: italic;">NULL</span>}
                                </td>
                                <td style="padding: 10px; font-family: monospace; font-size: 11px;">
                                    {menu.live_external_id || <span style="color: #999; font-style: italic;">NULL</span>}
                                </td>
                                <td style="padding: 10px; font-family: monospace; font-size: 11px; color: #666;">
                                    {menu.live_key || <span style="color: #999; font-style: italic;">NULL</span>}
                                </td>
                            </tr>
                        )}
                    </For>
                    <Show when={props.menus?.length === 0}>
                        <tr>
                            <td colspan="8" style="padding: 20px; text-align: center; color: #999; font-style: italic;">
                                {props.emptyMessage || 'No header_menu assignments found'}
                            </td>
                        </tr>
                    </Show>
                </tbody>
            </table>
        </div>
    );

    return (
        <Page>
            <PageTop
                title="Menus Debug"
                description="View all header_menu assignments and their sync status in draft/live"
                actions={<Button onClick={loadDebugData} loading={loading()}>Refresh Data</Button>}
            />

            <div style="padding: 20px; background: #f0f0f0; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 20px;">
                <h3 style="margin-top: 0; font-size: 14px; font-weight: bold;">🔍 Current Header Menu Assignments (Language-Specific)</h3>
                <p style="margin: 0 0 15px 0; font-size: 12px; color: #666;">
                    Menus stored in cerberus_nav_menus_[lang] options with language suffix
                </p>

                <Show when={loading()}>
                    <div style="padding: 20px; text-align: center; background: white; border: 1px solid #ddd; border-radius: 4px;">
                        Loading debug data...
                    </div>
                </Show>

                <Show when={!loading() && headerMenuData()}>
                    <MenuTable menus={headerMenuData()?.menus} />
                </Show>

                <Show when={!loading() && (error() || !headerMenuData())}>
                    <div style="padding: 20px; text-align: center; background: #fff3cd; border: 1px solid #ffc107; border-radius: 4px;">
                        <strong>⚠️ Failed to load debug data</strong>
                        <p style="margin: 5px 0 0 0; font-size: 12px;">
                            {error() || 'Check browser console for errors'}
                        </p>
                    </div>
                </Show>
            </div>

            <div style="padding: 20px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 4px;">
                <h3 style="margin-top: 0; font-size: 14px; font-weight: bold;">⚠️ Legacy Header Menu Assignments (Pre-WPML FIXES)</h3>
                <p style="margin: 0 0 15px 0; font-size: 12px; color: #856404;">
                    <strong>LEGACY:</strong> Menus stored in theme_mods_rawb option WITHOUT language suffix. This was used before language-specific storage was implemented.
                </p>

                <Show when={loading()}>
                    <div style="padding: 20px; text-align: center; background: white; border: 1px solid #ddd; border-radius: 4px;">
                        Loading legacy data...
                    </div>
                </Show>

                <Show when={!loading() && legacyMenuData()}>
                    <MenuTable
                        menus={legacyMenuData()?.menus}
                        emptyMessage="No legacy header_menu assignments found"
                    />
                </Show>

                <Show when={!loading() && (error() || !legacyMenuData())}>
                    <div style="padding: 20px; text-align: center; background: white; border: 1px solid #ddd; border-radius: 4px;">
                        <span style="color: #999; font-style: italic;">Failed to load legacy data</span>
                    </div>
                </Show>
            </div>
        </Page>
    );

};

export default MenusDebug;
