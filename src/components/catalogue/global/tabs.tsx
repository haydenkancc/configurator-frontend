'use client';
import s from './tabs.module.scss';

import {Tab, TabList, Tabs as AriaTabs} from 'react-aria-components';
import {usePathname} from 'next/navigation';

export default function Tabs({ items } : { items: {id: string, title: string;}[]}) {
    const paths = usePathname().split('/')
    const basePath = (paths.slice(0, 3)).join('/');
    return (
        <AriaTabs className={s.tabs} selectedKey={paths[3] ?? null}>
            <TabList aria-label="tabs" className={s.tabList} items={items}>
                {item =>
                    <Tab className={s.tab} id={item.id} href={`${basePath}/${item.id}`}>
                        {item.title}
                    </Tab>
                }
            </TabList>
        </AriaTabs>
    )
}