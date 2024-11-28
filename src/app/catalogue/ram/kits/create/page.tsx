import {Form} from './form';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';
import {MemoryKitParams} from '@/server/models/components';

export default async function Page() {

    const endpoint = '/api/Memory/MemoryKits'

    const submitAction = await postComponentAction(endpoint, ['MemoryKits'])

    const kitParams = (await getComponentParams<MemoryKitParams>(endpoint, ['Manufacturers', 'MemoryTypes', 'MemoryFormFactors', 'MemoryCapacities'])).data

    console.log(kitParams);

    return (
        <Form params={kitParams} action={submitAction}/>
    )
}