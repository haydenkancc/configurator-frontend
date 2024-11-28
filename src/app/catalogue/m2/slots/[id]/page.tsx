import {M2Slot, M2SlotParams} from '@/server/models/components';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/M2/M2slots'

    const slotParams = (await getComponentParams<M2SlotParams>(endpoint, ['M2Slots'])).data;

    const slot = (await getComponent<M2Slot>(endpoint, id, ['M2Slots'])).data;

    const action = await putComponentAction(endpoint, id, ['M2Slots'])

    return (
        <Form item={slot} action={action} params={slotParams}/>
    )
}