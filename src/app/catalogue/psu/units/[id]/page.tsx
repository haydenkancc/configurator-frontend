import {PowerSupply} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/PowerSupply/Units'

    const unit = (await getComponent<PowerSupply.UnitDto>(endpoint, id, [CatalogueTags.POWER_SUPPLY_UNITS, CatalogueTags.POWER_SUPPLY_CONNECTORS])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.POWER_SUPPLY_UNITS]);

    const unitParams = (await getComponentParams<PowerSupply.UnitParams>(endpoint, [CatalogueTags.GENERAL_COLOURS, CatalogueTags.GENERAL_MANUFACTURERS, CatalogueTags.POWER_SUPPLY_CONNECTORS, CatalogueTags.POWER_SUPPLY_MODULARITIES, CatalogueTags.POWER_SUPPLY_FORM_FACTORS, CatalogueTags.POWER_SUPPLY_EFFICIENCY_RATINGS])).data;

    console.log(unit)
    return (
        <Form item={unit} action={action} params={unitParams}/>
    )
}