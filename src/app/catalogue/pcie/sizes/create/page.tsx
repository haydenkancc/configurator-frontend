import { Form } from './form';
import {PCIeSize, PCIeSizeDbo} from '@/server/models';
import {configuratorApiClient} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';

export default async function Page() {

    async function submitAction(laneCount: number) {
        'use server'
        if (laneCount && laneCount > 0) {
            const size: PCIeSizeDbo = {
                laneCount,
            };
            const response = await configuratorApiClient.Post<PCIeSize>('api/PCIe/PCIeSizes', size, ['PCIeSizes']);
            console.log(response);
            if (!response.error) {
                revalidateTag('PCIeSizes');
                redirect(`/catalogue/pcie/sizes/${response.data?.laneCount}`)
            }
        }
    }

    return (
        <Form action={submitAction} />
    )
}