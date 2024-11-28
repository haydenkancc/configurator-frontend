'use client'
import s from './navigation.module.scss';
import {Tab, TabList, Tabs} from 'react-aria-components';
import {
    CarBattery,
    Circuitry, ComputerTower,
    Cpu,
    Fan,
    GraphicsCard,
    HardDrives,
    List,
    ListBullets,
    Memory,
    Plugs,
    Snowflake,
    TreeStructure
} from '@phosphor-icons/react/dist/ssr';
import {usePathname} from 'next/navigation';

const items = [
    {
        id: 1,
        title: 'General',
        href: 'general',
        icon: <TreeStructure weight="fill" />,
    },
    {
        id: 2,
        title: 'PCIe Specification',
        href: 'pcie',
        icon: <ListBullets weight="fill" />,
    },
    {
        id: 3,
        title: 'M.2 Specification',
        href: 'm2',
        icon: <List weight="fill" />,
    },
    {
        id: 4,
        title: 'I/O Specification',
        href: 'io',
        icon: <Plugs weight="fill" />,
    },
    {
        id: 5,
        title: 'Memory',
        href: 'ram',
        icon: <Memory weight="fill" />,
    },
    {
        id: 6,
        title: 'Fans',
        href: 'fan',
        icon: <Fan weight="fill" />,
    },
    {
        id: 7,
        title: 'Processors',
        href: 'cpu',
        icon: <Cpu weight="fill" />,
    },
    {
        id: 8,
        title: 'Power Supplies',
        href: 'psu',
        icon: <CarBattery weight="fill" />,
    },
    {
        id: 9,
        title: 'Storage',
        href: 'storage',
        icon: <HardDrives weight="fill" />,
    },
    {
        id: 10,
        title: 'Motherboards',
        href: 'mobo',
        icon: <Circuitry weight="fill" />,
    },

    {
        id: 11,
        title: 'Graphics Cards',
        href: 'gpu',
        icon: <GraphicsCard weight="fill" />,
    },
    {
        id: 12,
        title: 'Coolers',
        href: 'cooler',
        icon: <Snowflake weight="fill" />,
    },
    {
        id: 13,
        title: 'Cases',
        href: 'case',
        icon: <ComputerTower weight="fill" />
    }
]

export default function Navigation() {
    let paths = usePathname().split('/')
    let basePath = (paths.slice(0, 2)).join('/');
    let pathname = paths[2]

    return (
        <div className={s.navigation}>
            <Tabs selectedKey={pathname} orientation="vertical">
                <TabList items={items} className={s.tabList} aria-label="navigation">
                    {item => (
                        <Tab className={s.tab} aria-label="navigation route" href={`${basePath}/${item.href}`} id={item.href}>
                            {item.icon} {item.title}
                        </Tab>
                    )}
                </TabList>
            </Tabs>
        </div>
    )
}