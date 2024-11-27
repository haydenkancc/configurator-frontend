'use client'

import {useRouter} from 'next/navigation';
import {RouterProvider} from 'react-aria-components';
import {createContext} from 'react';
import {ToastQueue} from '@react-stately/toast';
import {GlobalToastRegion, ToastContent} from '@/components/ui/toast';

declare module 'react-aria-components' {
    interface RouterConfig {
        routerOptions: NonNullable<
            Parameters<ReturnType<typeof useRouter>['push']>[1]
        >;
    }
}

export function ClientProviders({ children } : Readonly<{ children: React.ReactNode }>) {
    const router = useRouter();
    return (
        <RouterProvider navigate={router.push}>
            {children}
        </RouterProvider>
    );
}

const toastQueue = new ToastQueue<ToastContent>({ maxVisibleToasts: 5, hasExitAnimation: true })

export const ToastQueueContext = createContext(toastQueue);
export function ToastProvider({ children } : Readonly<{ children: React.ReactNode }>) {
    return (
        <ToastQueueContext.Provider value={toastQueue}>
            <>
                {children}
                <GlobalToastRegion toastQueue={toastQueue} />
            </>
        </ToastQueueContext.Provider>
    )
}



