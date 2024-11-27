import {configuratorApiClient} from '@/server/catalogue';
import {M2Key, M2SlotParams} from '@/server/models';
import {revalidateTag} from 'next/cache';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/catalogue/test';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/M2/M2keys'

    const keyParams = (await getComponentParams<M2SlotParams>(endpoint, ['M2Keys'])).data;

    const key = (await getComponent<M2Key>(endpoint, id, ['M2keys'])).data;

    const action = await putComponentAction(endpoint, id, ['M2keys'])

    return (
        <Form item={key} action={action} params={keyParams}/>
    )
}