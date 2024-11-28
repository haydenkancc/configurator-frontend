import {MemoryType} from '@/server/models/components';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Memory/MemoryTypes'

    const type = (await getComponent<MemoryType>(endpoint, id, ['MemoryTypes'])).data;

    const action = await putComponentAction(endpoint, id, ['MemoryTypes'])

    return (
        <Form item={type} action={action}/>
    )
}