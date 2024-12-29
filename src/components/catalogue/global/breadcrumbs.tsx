'use client'
import s from './breadcrumbs.module.scss';
import {Breadcrumb as AriaBreadcrumb, Breadcrumbs as AriaBreadcrumbs, Link} from 'react-aria-components';
import {CaretRight} from '@phosphor-icons/react';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';

const breadcrumbMap = new Map([
    ["catalogue", "Catalogue" ],
    ["pcie", "PCIe" ],
    ["slots", "Slots" ],
    ["create", "Create" ],
    ["sizes", "Sizes" ],
    ["brackets", "Brackets" ],
    ["versions", "Versions" ],
    ["m2", "M.2" ],
    ["keys", "Keys" ],
    ["form-factors", "Form Factors" ],
    ["ram", "Memory" ],
    ["general", "General"],
    ["colours", "Colours"],
    ["manufacturers", "Manufacturers"],
    ["connectors", "Connectors"],
    ["io", "I/O"],
    ["kits", "Kits"],
    ["types", "Types"],
    ["cpu", "Processor"],
    ["series", "Series"],
    ["core-families", "Core Families"],
    ["microarchitectures", "Microarchitectures"],
    ["sockets", "Sockets"],
    ["units", "Units"],
    ["fan", "Fan"],
    ["packs", "Packs"],
    ["psu", "Power Supply"],
    ["efficiency-ratings", "Efficiency Ratings"],
    ["modularities", "Modularities"],
    ["gpu", "Graphics Card"],
    ["chipsets", "Chipsets"],
    ["mobo", "Motherboard"],
]
);

export default function Breadcrumbs() {
    const pathname = usePathname();

    const [pathTitles, setPathTitles] = useState<{title: string, href: string}[]>();

    useEffect(() => {
        const paths = pathname.split('/')
        setPathTitles(paths.map((path, index) => ({
            title: breadcrumbMap.get(path) ?? path,
            href: (paths.slice(0, index + 1)).join('/')
        })))
    }, [pathname])

    return (
        <AriaBreadcrumbs className={s.breadcrumbs} items={pathTitles}>
            {item =>
                <AriaBreadcrumb className={s.breadcrumb} id={item.href} key={item.href}>
                    <Link href={item.href}>{item.title}</Link>
                    <CaretRight weight="bold" className={s.separator}/>
                </AriaBreadcrumb>
            }
            {/*<AriaBreadcrumb className={s.breadcrumb}>*/}
            {/*    <Link href="/">Home</Link>*/}
            {/*    <CaretRight />*/}
            {/*</AriaBreadcrumb>*/}
            {/*<AriaBreadcrumb className={s.breadcrumb}>*/}
            {/*    <Link href="/react-aria/">React Aria</Link>*/}
            {/*    <CaretRight />*/}
            {/*</AriaBreadcrumb>*/}
            {/*<AriaBreadcrumb className={s.breadcrumb}>*/}
            {/*    <Link>Breadcrumbs</Link>*/}
            {/*    <CaretRight />*/}
            {/*</AriaBreadcrumb>*/}
        </AriaBreadcrumbs>
    )
}