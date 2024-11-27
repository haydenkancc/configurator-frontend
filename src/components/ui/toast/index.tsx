import {ToastQueue, ToastState, useToastQueue, useToastState} from '@react-stately/toast';
import {AriaToastProps, AriaToastRegionProps, useToast, useToastRegion} from '@react-aria/toast';
import {cloneElement, useRef} from 'react';
import {Button} from 'react-aria-components';
import {createPortal} from 'react-dom';
import s from './index.module.scss'


export interface ToastContent {
    title?: React.ReactNode,
    description?: React.ReactNode,
    action?: React.ReactNode,
    color?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning',
}

interface GlobalToastRegionProps<T> extends AriaToastRegionProps {
    toastQueue: ToastQueue<T>;
}

export function GlobalToastRegion<T extends ToastContent>({toastQueue, ...props} : GlobalToastRegionProps<T>) {
    // Subscribe to it.
    let state = useToastQueue(toastQueue);

    // Render toast region.
    return state.visibleToasts.length > 0
        ? createPortal(<ToastRegion {...props} state={state} />, document.body)
        : null;
}

interface ToastRegionProps<T> extends AriaToastRegionProps {
    state: ToastState<T>;
}

function ToastRegion<T extends ToastContent>({ state, ...props }: ToastRegionProps<T>) {
    let ref = useRef(null);
    let { regionProps } = useToastRegion(props, state, ref);

    return (
        <div {...regionProps} ref={ref} className={s.toastRegion}>
            {state.visibleToasts.map((toast) => (
                <Toast key={toast.key} toast={toast} state={state} />
            ))}
        </div>
    );
}


interface ToastProps<T> extends AriaToastProps<T> {
    state: ToastState<T>;
    color?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning',
}

function Toast({ state, ...props }: ToastProps<ToastContent>) {
    let ref = useRef(null);
    let { toastProps, contentProps, titleProps, descriptionProps, closeButtonProps } = useToast(
        props,
        state,
        ref
    );

    return (
        <div
            {...toastProps}
            ref={ref}
            className={`
            ${s.toast}
            ${props.toast.content.color == 'primary' ? s.toast__primary : ''}
            ${props.toast.content.color == 'neutral' ? s.toast__neutral : ''}
            ${props.toast.content.color == 'danger' ? s.toast__danger : ''}
            ${props.toast.content.color == 'success' ? s.toast__success : ''}
            ${props.toast.content.color == 'warning' ? s.toast__warning : ''}
            `}
             data-animation={props.toast.animation}
             onAnimationEnd={() => {
                 if (props.toast.animation === 'exiting') {
                     state.remove(props.toast.key);
                 }
             }}
        >
            <div {...contentProps} className={s.toastContent}>
                <div {...titleProps} className={s.title}>{props.toast.content.title}</div>
                <div {...descriptionProps} className={s.description}>{props.toast.content.description}</div>
            </div>
            <Button {...closeButtonProps}>{props.toast.content.action}</Button>
        </div>
    );
}