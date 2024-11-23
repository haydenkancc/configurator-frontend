import { Form } from './form';
import {configuratorApiClient} from '@/server/catalogue';
import {PCIeSlot, PCIeSlotDbo, PCIeSlotParams} from '@/server/models';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';
import {Key} from 'react-aria-components';

export default async function Page() {

    async function getSlotParams() {
        'use server';
        const response = await configuratorApiClient.Get<PCIeSlotParams>('api/PCIe/PCIeSlots/params', ['PCIeSlots']);
        return response.data;
    }

    async function submitAction(physicalSizeID?: Key, laneSizeID?: Key, versionID?: Key) {
        'use server'
        const slot: Partial<PCIeSlotDbo> = {
            physicalSizeID: (physicalSizeID as number) ? (physicalSizeID as number) : undefined,
            laneSizeID: (laneSizeID as number) ? (laneSizeID as number) : undefined,
            versionID: (versionID as number) ? (versionID as number) : undefined,
        };

        const response = await configuratorApiClient.Post<PCIeSlot>(`api/PCIe/PCIeSlots`, slot);
        if(!response.error) {
            revalidateTag('PCIeSlots');
            redirect(`/catalogue/pcie/slots/${response.data?.id}`)
        }
    }

    const slotParams = await getSlotParams() ?? undefined;
    
    return (
        <Form slotParams={slotParams} action={submitAction} />
    )
}