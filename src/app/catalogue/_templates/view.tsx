'use client';
import s from './view.module.scss'
import {ButtonProps, Form, FormProps, LinkProps} from 'react-aria-components';
import {usePathname, useRouter} from 'next/navigation';
import {Link} from '@/components/ui/button';
import {ArrowLeft} from '@phosphor-icons/react/dist/ssr';

interface MyCreateBodyProps extends FormProps {

}

export function FormBody({children, ...props} : MyCreateBodyProps){
    return (
        <Form className={s.body} {...props}>
            {children}
        </Form>
    )
}


export function Body({ children } : Readonly<{ children: React.ReactNode}>) {
    return (
        <div className={s.body}>
            { children }
        </div>
    )
}

export function Controls({children} : Readonly<{children: React.ReactNode}>) {
    return (
        <div className={s.controls}>
            {children}
        </div>
    )
}

export function BackButton({ ...props} : ButtonProps) {
    const router = useRouter();
    return (
        <Link onPress={router.back} variant="neutral">
            <ArrowLeft />Back to previous page
        </Link>
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

interface ModuleProps extends FormProps {
    children: React.ReactNode;
    title: string,
    subtitle: string,
}

export function FormModule({children, title, subtitle, ...props} : ModuleProps) {

    return (
        <Form className={s.module} {...props}>
            <div className={s.title}>
                <h1 className={s.header}>
                    {title}
                </h1>
                <h2 className={s.subheader}>
                    {subtitle}
                </h2>
            </div>
            {children}
        </Form>
    )
}

export function Module({children, title, subtitle, ...props} : Partial<ModuleProps>) {
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

export function Content({ children } : Readonly<{ children: React.ReactNode }>) {
    return (
        <div className={s.content}>
            {children}
        </div>
    )
}

export function Row({ children } : Readonly<{children : React.ReactNode}>) {
    return (
        <div className={s.row}>{children}</div>
    )
}

export function Footer({ children } : Readonly<{ children: React.ReactNode }>) {
    return (
        <div className={s.footer}>
            {children}
        </div>
    )
}
