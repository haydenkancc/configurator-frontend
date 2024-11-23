import { Form } from './form';
import {PCIeVersion, PCIeVersionDbo} from '@/server/models';
import {configuratorApiClient} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';

export default function Page() {

    async function submitAction(name: string) {
        'use server'
        const version: PCIeVersionDbo = {
            name: name,
        };
        const response = await configuratorApiClient.Post<PCIeVersion>('api/PCIe/PCIeVersions', version, ['PCIeVersions']);
        console.log(response);
        if (!response.error) {
            revalidateTag('PCIeVersions');
            redirect(`/catalogue/pcie/versions/${response.data?.id}`)
        }
    }


    return (
        <Form action={submitAction} />
    )
}