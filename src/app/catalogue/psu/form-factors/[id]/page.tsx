import {PowerSupplyFormFactor} from '@/server/models/components';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/PowerSupply/PowerSupplyFormFactors'

    const formFactor = (await getComponent<PowerSupplyFormFactor>(endpoint, id, ['PowerSupplyFormFactors'])).data;

    const action = await putComponentAction(endpoint, id, ['PowerSupplyFormFactors'])

    return (
        <Form item={formFactor} action={action}/>
    )
}