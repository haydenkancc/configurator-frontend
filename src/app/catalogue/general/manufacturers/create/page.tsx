import { Form } from './form';
import {Manufacturer, ManufacturerDbo} from '@/server/models';
import {configuratorApiClient} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';

export default async function Page() {

    async function submitAction(name: string) {
        'use server'
        const manufacturer: ManufacturerDbo = {
            name: name,
        };
        const response = await configuratorApiClient.Post<Manufacturer>('api/Manufacturers', manufacturer, ['Manufacturers']);
        console.log(response);
        if (!response.error) {
            revalidateTag('Manufacturers');
            redirect(`/catalogue/general/manufacturers/${response.data?.id}`)
        }
    }

    return (
        <Form action={submitAction} />
    )
}