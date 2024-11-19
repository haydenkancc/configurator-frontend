'use client'
import s from './breadcrumbs.module.scss';
import {Breadcrumb as AriaBreadcrumb, Breadcrumbs as AriaBreadcrumbs, Link} from 'react-aria-components';
import {CaretRight} from '@phosphor-icons/react';

export default function Breadcrumbs() {


    return (
        <AriaBreadcrumbs className={s.breadcrumbs}>
            <AriaBreadcrumb className={s.breadcrumb}>
                <Link href="/">Home</Link>
                <CaretRight />
            </AriaBreadcrumb>
            <AriaBreadcrumb className={s.breadcrumb}>
                <Link href="/react-aria/">React Aria</Link>
                <CaretRight />
            </AriaBreadcrumb>
            <AriaBreadcrumb className={s.breadcrumb}>
                <Link>Breadcrumbs</Link>
                <CaretRight />
            </AriaBreadcrumb>
        </AriaBreadcrumbs>
    )
}