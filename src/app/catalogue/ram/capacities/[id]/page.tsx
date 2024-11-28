import {MemoryCapacity} from '@/server/models/components';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Memory/MemoryCapacities'

    const capacity = (await getComponent<MemoryCapacity>(endpoint, id, ['MemoryCapacities'])).data;

    const action = await putComponentAction(endpoint, id, ['MemoryCapacities'])

    return (
        <Form item={capacity} action={action}/>
    )
}