import { Form } from './form';
import {PCIeSlotParams, PCIeSlot, PCIeSlotDbo} from '@/server/models';
import {getComponentParams, postComponentAction} from '@/server/catalogue/test';

export default async function Page() {
    const endpoint = '/api/PCIe/PCIeSlots'

    const slotParams = (await getComponentParams<PCIeSlotParams>(endpoint, ['PCIeVersions', 'PCIeSizes'])).data;
    const submitAction = await postComponentAction(endpoint, '/catalogue/pcie/slots', ['PCIeSlots'])

    return (
        <Form params={slotParams} action={submitAction} />
    )
}