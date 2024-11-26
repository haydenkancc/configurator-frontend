import { Form } from './form';
import {MemorySize, MemorySizeDbo} from '@/server/models';
import {configuratorApiClient} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';

export default async function Page() {

    async function submitAction(size: number) {
        'use server'
        if (size && size > 0) {
            const memorySize: MemorySizeDbo = {
                size,
            };
            const response = await configuratorApiClient.Post<MemorySize>('api/Memory/MemorySizes', memorySize, ['MemorySizes']);
            console.log(response);
            if (!response.error) {
                revalidateTag('MemorySizes');
                redirect(`/catalogue/ram/sizes/${response.data?.size}`)
            }
        }
    }

    return (
        <Form action={submitAction} />
    )
}