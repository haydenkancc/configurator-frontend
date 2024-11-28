import {PCIeSlot, PCIeSlotParams} from '@/server/models/components';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/PCIe/PCIeSlots'

    const slot = (await getComponent<PCIeSlot>(endpoint, id, ['PCIeSlots'])).data;

    const slotParams = (await getComponentParams<PCIeSlotParams>(endpoint, ['PCIeVersions', 'PCIeSizes'])).data;

    const action = await putComponentAction(endpoint, id, ['PCIeSlots'])

    return (
        <Form item={slot} params={slotParams} action={action}/>
    )
}