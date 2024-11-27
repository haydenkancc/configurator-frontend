import { Form } from './form';
import {M2SlotParams} from '@/server/models';
import {getComponentParams, postComponentAction} from '@/server/catalogue/test';

export default async function Page() {
    const endpoint = '/api/M2/M2Slots'

    const slotParams = (await getComponentParams<M2SlotParams>(endpoint, ['M2Slots'])).data;

    const submitAction = await postComponentAction(endpoint, '/catalogue/m2/slots', ['M2Slots'])

    return (
        <Form params={slotParams} action={submitAction} />
    )
}