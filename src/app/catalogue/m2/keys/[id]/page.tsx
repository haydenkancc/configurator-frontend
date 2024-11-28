import {M2Key, M2KeyParams} from '@/server/models/components';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/M2/M2Keys'

    const keyParams = (await getComponentParams<M2KeyParams>(endpoint, ['M2Keys'])).data;

    const key = (await getComponent<M2Key>(endpoint, id, ['M2Keys'])).data;

    const action = await putComponentAction(endpoint, id, ['M2Keys'])

    return (
        <Form item={key} action={action} params={keyParams}/>
    )
}