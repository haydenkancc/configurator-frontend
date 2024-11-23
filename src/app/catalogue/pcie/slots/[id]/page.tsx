import {BackLink, Content, Controls, Body, FormModule, Footer, Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import NumberField from '@/components/ui/number-field';
import {PCIeSizeSelect, PCIeVersionSelect} from '@/app/catalogue/pcie/slots/fields';
import { Details } from './forms';
import {configuratorApiClient} from '@/server/catalogue';
import {PCIeSlot, PCIeSlotDbo, PCIeSlotParams} from '@/server/models';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';
import {Key} from 'react-aria-components';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);

    async function getSlotParams() {
        'use server';
        const response = await configuratorApiClient.Get<PCIeSlotParams>('api/PCIe/PCIeSlots/params', ['PCIeSlots']);
        return response.data;
    }

    async function getSlot(id: number) {
        const response = await configuratorApiClient.Get<PCIeSlot>(`api/PCIe/PCIeSlots/id/${id}`, ['PCIeSlots'])
        return response.data;
    }

    async function submitDetailsAction(physicalSizeID?: Key, laneSizeID?: Key, versionID?: Key) {
        'use server'
        if(physicalSizeID || laneSizeID || versionID)
        {
            const slot: Partial<PCIeSlotDbo> = {
                physicalSizeID: (physicalSizeID as number),
                laneSizeID: (laneSizeID as number),
                versionID: (versionID as number),
            };
            const response = await configuratorApiClient.Put<PCIeSlot>(`api/PCIe/PCIeSlots/id/${id}`, slot);
            if(!response.error) {
                revalidateTag('PCIeSlots');
                redirect(`/catalogue/pcie/slots/${id}`)
            }
        }
    }


    const slotParams = await getSlotParams() ?? undefined;

    const slot = (await getSlot(id))
    
    return (
        <Body>
            <Controls>
                <BackLink />
            </Controls>
            {slot && <Details slotParams={slotParams} slot={slot} action={submitDetailsAction} />}
        </Body>
    )
}