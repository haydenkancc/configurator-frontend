import {PowerSupplyModularity} from '@/server/models/components';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/PowerSupply/PowerSupplyModularities'

    const modularity = (await getComponent<PowerSupplyModularity>(endpoint, id, ['PowerSupplyModularities'])).data;

    const action = await putComponentAction(endpoint, id, ['PowerSupplyModularities'])

    return (
        <Form item={modularity} action={action}/>
    )
}