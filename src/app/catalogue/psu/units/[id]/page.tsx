import {PowerSupplyUnit, PowerSupplyUnitParams} from '@/server/models/components';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/PowerSupply/PowerSupplyUnits'

    const unit = (await getComponent<PowerSupplyUnit>(endpoint, id, ['PowerSupplyUnits'])).data;

    const action = await putComponentAction(endpoint, id, ['PowerSupplyUnits'])

    const unitParams = (await getComponentParams<PowerSupplyUnitParams>(endpoint, ['Manufacturers', 'PowerSupplyFormFactors', 'PowerSupplyModularities', 'PowerSupplyEfficiencyRatings', 'PowerSupplyConnectors'])).data

    return (
        <Form item={unit} action={action} params={unitParams} />
    )
}