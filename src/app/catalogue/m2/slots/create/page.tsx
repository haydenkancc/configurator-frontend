import {Form} from './form';
import {M2SlotParams} from '@/server/models/components';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';

export default async function Page() {
    const endpoint = '/api/M2/M2Slots'

    const slotParams = (await getComponentParams<M2SlotParams>(endpoint, ['M2Slots'])).data;

    const submitAction = await postComponentAction(endpoint, ['M2Slots'])

    return (
        <Form params={slotParams} action={submitAction} />
    )
}