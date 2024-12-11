'use client';
import s from './view.module.scss'
import {ButtonProps, Form, FormProps, LinkProps} from 'react-aria-components';
import {usePathname, useRouter} from 'next/navigation';
import {Button, Link} from '@/components/ui/button';
import {ArrowLeft} from '@phosphor-icons/react/dist/ssr';
import {useContext, useState} from 'react';
import {ToastQueueContext} from '@/app/providers';
import {ToastContent} from '@/components/ui/toast';
import {ToastQueue} from '@react-stately/toast';

interface PutBodyProps extends Omit<FormProps, 'method'> {
    submitAction: () => Promise<boolean>;
    name: string;
}

interface PostBodyProps extends Omit<FormProps, 'method'> {
    submitAction: () => Promise<number | null>;
    name: string;
}

export function PutBody({ children, onSubmit, name, submitAction, ...props } : PutBodyProps) {
    const toastQueue = useContext(ToastQueueContext)
    const upperName = name.charAt(0).toUpperCase() + name.slice(1);
    const lowerName =  name.toLowerCase();
    const [ isLoading, setLoading ] = useState(false);

    return (
        <Form className={s.body} {...props} onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const ok = await submitAction();
            if (ok) {
                toastQueue.add({ title: 'Changes successfully saved.', color: 'success'}, { timeout: 3000 })
            } else {
                toastQueue.add({ title: 'Failed to save changes, please try again later.', color: 'danger'}, { timeout: 3000 })
            }
            setLoading(false);

        }}>
            <>
                <Controls>
                    <BackLink /><Button variant="primary" type="submit" isLoading={isLoading} >Save changes</Button>
                </Controls>
                { children }
            </>
        </Form>
    )
}

export function PostBody({ children, onSubmit, submitAction, name, ...props } : PostBodyProps) {
    const toastQueue = useContext(ToastQueueContext)
    const router = useRouter()
    const upperName = name.charAt(0).toUpperCase() + name.slice(1);
    const lowerName =  name.toLowerCase();
    const [ isLoading, setLoading ] = useState(false);
    return (
        <Form className={s.body} {...props} onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const id = await submitAction();
            if (id) {
                toastQueue.add({ title: `${upperName} successfully created.`, color: 'primary'}, { timeout: 3000 })
                router.push(`${id}`)
            } else {
                toastQueue.add({ title: `Failed to create ${lowerName}, please try again later.`, color: 'warning'}, { timeout: 3000 })
                setLoading(false);
            }
        }}>
            <>
                <Controls>
                    <BackLink /><Button variant="primary" type="submit" isLoading={isLoading} >Create {lowerName}</Button>
                </Controls>
                { children }
            </>
        </Form>
    )
}

export function Controls({children} : Readonly<{children: React.ReactNode}>) {
    return (
        <div className={s.controls}>
            {children}
        </div>
    )
}

export function BackLink({...props} : LinkProps) {
    const paths = usePathname().split('/');
    const backPath = (paths.slice(0, 4)).join('/');
    return (
        <Link variant="neutral" href={backPath} {...props}>
            <ArrowLeft />Back to {paths[3].replace('-', ' ')}
        </Link>
    )
}

interface ModuleProps {
    children: React.ReactNode;
    title: string,
    subtitle: string,
}

export function Module({children, title, subtitle} : ModuleProps) {
    return (
        <div className={s.module}>
            <div className={s.title}>
                <h1 className={s.header}>
                    {title}
                </h1>
                <h2 className={s.subheader}>
                    {subtitle}
                </h2>
            </div>
            {children}
        </div>
    )
}

export function Content({ children, isNested = false } : Readonly<{ children?: React.ReactNode, isNested?: boolean }>) {
    return (
        <div className={`${s.content} ${isNested ? s.content__nested : ''}`}>
            {children}
        </div>
    )
}

export function Row({ children, justify } : Readonly<{children?: React.ReactNode, justify?: 'start' | 'center' | 'end' }>) {
    return (
        <div className={`${s.row} 
            ${justify === 'start' ? s.row__start : justify === 'center' ? s.row__center : justify === 'end' ? s.row__end : ''}
        `}>{children}</div>
    )
}

export function Block({ children } : Readonly<{children : React.ReactNode}>) {
    return (
        <div className={s.block}>{children}</div>
    )
}

export function Grid({ children } : Readonly<{children : React.ReactNode}>) {
    return (
        <div className={s.grid}>{children}</div>
    )
}

export function Footer({ children } : Readonly<{ children: React.ReactNode }>) {
    return (
        <div className={s.footer}>
            {children}
        </div>
    )
}
