import {MemoryFormFactor} from '@/server/models/components';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Memory/MemoryFormFactors'

    const formFactor = (await getComponent<MemoryFormFactor>(endpoint, id, ['MemoryFormFactors'])).data;

    const action = await putComponentAction(endpoint, id, ['MemoryFormFactors'])

    return (
        <Form item={formFactor} action={action}/>
    )
}