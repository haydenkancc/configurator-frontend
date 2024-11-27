import {configuratorApiClient} from '@/server/catalogue';
import {PCIeSlot, PCIeSlotDbo, PCIeSlotParams} from '@/server/models';
import {revalidateTag} from 'next/cache';
import {Form} from './form';
import {redirect} from 'next/navigation';
import {getComponent, getComponentParams, putComponentAction} from '@/server/catalogue/test';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/PCIe/PCIeSlots'

    const slot = (await getComponent<PCIeSlot>(endpoint, id, ['PCIeSlots'])).data;

    const slotParams = (await getComponentParams<PCIeSlotParams>(endpoint, ['PCIeVersions', 'PCIeSizes'])).data;

    const action = await putComponentAction(endpoint, id, ['PCIeSlots'])

    return (
        <Form item={slot} params={slotParams} action={action}/>
    )
}