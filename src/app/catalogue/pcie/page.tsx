'use client'
import {GlobalToastRegion, ToastContent} from "@/components/ui/toast";
import {Button} from '@/components/ui/button';
import {ToastQueue} from '@react-stately/toast';

export default function Page() {

    const toastQueue = new ToastQueue<ToastContent>({ maxVisibleToasts: 5, hasExitAnimation: true })
    return (
        <>
            <Button onPress={() => toastQueue.add({title: 'Changes saved to server.', color: 'success'}, {timeout: 5000})}>press me!</Button>

        </>
    )
}