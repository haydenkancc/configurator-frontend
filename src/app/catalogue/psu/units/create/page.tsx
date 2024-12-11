import {Form} from './form';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';
import {PowerSupplyUnitParams} from '@/server/models/components';

export default async function Page() {

    const endpoint = '/api/PowerSupply/PowerSupplyUnits'

    const submitAction = await postComponentAction(endpoint, ['PowerSupplyUnits'])

    const unitParams = (await getComponentParams<PowerSupplyUnitParams>(endpoint, ['Manufacturers', 'PowerSupplyFormFactors', 'PowerSupplyModularities', 'PowerSupplyEfficiencyRatings', 'PowerSupplyConnectors'])).data

    console.log(unitParams);

    return (
        <Form params={unitParams} action={submitAction}/>
    )
}