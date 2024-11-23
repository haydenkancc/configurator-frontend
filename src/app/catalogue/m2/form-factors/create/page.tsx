import { Form } from './form';
import {M2FormFactor, M2FormFactorDbo} from '@/server/models';
import {configuratorApiClient} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';

export default async function Page() {

    async function submitAction(name: string) {
        'use server'
        const formFactor: M2FormFactorDbo = {
            name: name,
        };
        const response = await configuratorApiClient.Post<M2FormFactor>('api/M2/M2FormFactors', formFactor, ['M2FormFactors']);
        console.log(response);
        if (!response.error) {
            revalidateTag('M2FormFactors');
            redirect(`/catalogue/m2/form-factors/${response.data?.id}`)
        }
    }

    return (
        <Form action={submitAction} />
    )
}