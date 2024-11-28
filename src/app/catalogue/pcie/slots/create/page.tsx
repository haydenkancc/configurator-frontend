import {Form} from './form';
import {PCIeSlotParams} from '@/server/models/components';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';

export default async function Page() {
    const endpoint = '/api/PCIe/PCIeSlots'

    const slotParams = (await getComponentParams<PCIeSlotParams>(endpoint, ['PCIeVersions', 'PCIeSizes'])).data;
    const submitAction = await postComponentAction(endpoint, ['PCIeSlots'])

    return (
        <Form params={slotParams} action={submitAction}/>
    )
}