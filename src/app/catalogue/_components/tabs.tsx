'use client';
import s from './tabs.module.scss';

import {Tabs as AriaTabs, TabList, Tab} from 'react-aria-components';
import {usePathname} from 'next/navigation';

export default function Tabs() {
    const paths = usePathname().split('/')
    const basePath = (paths.slice(0, 3)).join('/');
    return (
        <AriaTabs className={s.tabs} selectedKey={paths[3] ?? null}>
            <TabList aria-label="tabs" className={s.tabList}>
                <Tab className={s.tab} id="slots" href={`${basePath}/slots`}>Slots</Tab>
                <Tab className={s.tab} id="brackets" href={`${basePath}/brackets`}>Brackets</Tab>
                <Tab className={s.tab} id="sizes" href={`${basePath}/sizes`}>Sizes</Tab>
                <Tab className={s.tab} id="versions" href={`${basePath}/versions`}>Versions</Tab>
            </TabList>
        </AriaTabs>
    )
}