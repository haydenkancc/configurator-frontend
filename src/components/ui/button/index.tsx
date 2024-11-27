'use client'
import { CircleNotch } from '@phosphor-icons/react/dist/ssr';
import s from './index.module.scss';

import {Button as AriaButton, ButtonProps, Link as AriaLink, LinkProps} from 'react-aria-components';

interface MyButtonProps extends ButtonProps {
    variant?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning' | 'plain' | 'trash',
    isLoading?: boolean
}


export function Button({children, className, variant, isLoading = false, isDisabled, ...props} : MyButtonProps) {
    let variantClass: string ='';
    switch (variant) {
        case 'primary':
            variantClass = s.primary;
            break;
        case 'neutral':
            variantClass = s.neutral;
            break;
        case 'danger':
            variantClass = s.danger;
            break;
        case 'success':
            variantClass = s.success;
            break;
        case 'warning':
            variantClass = s.warning;
            break;
        case 'plain':
            variantClass = s.plain;
            break;
        case 'trash':
            variantClass = s.trash;
            break;
    }

    return (
        <AriaButton className={`
        ${s.button} 
        ${className} 
        ${variantClass}`} {...props} isDisabled={isDisabled || isLoading} data-loading={isLoading}>
            <>
                {children}
                {isLoading && <div className={s.loaderWrapper}><div className={s.loader}/></div>}
            </>
        </AriaButton>
    )
}

interface MyLinkProps extends LinkProps {
    variant?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning' | 'plain' | 'trash',
}

export function Link({ children, className, variant, ...props} : MyLinkProps) {
    let variantClass = "";
    switch (variant) {
        case 'primary':
            variantClass = s.primary;
            break;
        case 'neutral':
            variantClass = s.neutral;
            break;
        case 'danger':
            variantClass = s.danger;
            break;
        case 'success':
            variantClass = s.success;
            break;
        case 'warning':
            variantClass = s.warning;
            break;
        case 'plain':
            variantClass = s.plain;
            break;
        case 'trash':
            variantClass = s.trash;
            break;
    }

    return (
        <AriaLink className={`${s.button} ${className} ${variantClass}`} {...props}>
            {children}
        </AriaLink>
    )
}