import { Form } from './form';
import {MemoryType, MemoryTypeDbo} from '@/server/models';
import {configuratorApiClient} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';

export default async function Page() {

    async function submitAction(name: string) {
        'use server'
        const type: MemoryTypeDbo = {
            name: name,
        };
        const response = await configuratorApiClient.Post<MemoryType>('api/Memory/MemoryTypes', type, ['MemoryTypes']);
        console.log(response);
        if (!response.error) {
            revalidateTag('MemoryTypes');
            redirect(`/catalogue/ram/types/${response.data?.id}`)
        }
    }

    return (
        <Form action={submitAction} />
    )
}