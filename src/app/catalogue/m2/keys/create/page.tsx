import { Form } from './form';
import {M2SlotParams, M2Slot, M2SlotDbo, M2KeyParams} from '@/server/models';
import {getComponentParams, postComponentAction} from '@/server/catalogue/test';

export default async function Page() {
    const endpoint = '/api/M2/M2Keys'

    const keyParams = (await getComponentParams<M2KeyParams>(endpoint, ['M2Keys'])).data;

    const submitAction = await postComponentAction(endpoint, '/catalogue/m2/keys', ['M2Keys'])

    return (
        <Form params={keyParams} action={submitAction} />
    )
}