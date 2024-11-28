import {Form} from './form';
import {M2KeyParams} from '@/server/models/components';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';

export default async function Page() {
    const endpoint = '/api/M2/M2Keys'

    const keyParams = (await getComponentParams<M2KeyParams>(endpoint, ['M2Keys'])).data;

    const submitAction = await postComponentAction(endpoint, ['M2Keys'])

    return (
        <Form params={keyParams} action={submitAction} />
    )
}