import { Form } from './form';
import {MemoryFormFactor, MemoryFormFactorDbo} from '@/server/models';
import {configuratorApiClient} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';

export default async function Page() {

    async function submitAction(name: string) {
        'use server'
        const formFactor: MemoryFormFactorDbo = {
            name: name,
        };
        const response = await configuratorApiClient.Post<MemoryFormFactor>('api/Memory/MemoryFormFactors', formFactor, ['MemoryFormFactors']);
        console.log(response);
        if (!response.error) {
            revalidateTag('MemoryFormFactors');
            redirect(`/catalogue/ram/form-factors/${response.data?.id}`)
        }
    }

    return (
        <Form action={submitAction} />
    )
}