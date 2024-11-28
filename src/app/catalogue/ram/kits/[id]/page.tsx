import {MemoryKit, MemoryKitParams} from '@/server/models/components';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Memory/MemoryKits'

    const kit = (await getComponent<MemoryKit>(endpoint, id, ['MemoryKits'])).data;

    const action = await putComponentAction(endpoint, id, ['MemoryKits'])

    const kitParams = (await getComponentParams<MemoryKitParams>(endpoint, ['Manufacturers', 'MemoryTypes', 'MemoryFormFactors', 'MemoryCapacities'])).data

    return (
        <Form item={kit} action={action} params={kitParams} />
    )
}