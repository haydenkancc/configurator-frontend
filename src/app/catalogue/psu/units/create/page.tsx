import {Form} from './form';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';
import { PowerSupply } from '@/server/models/catalogue';
import {CatalogueTags} from '@/server/models/catalogue/tags';

export default async function Page() {

    const endpoint = '/api/PowerSupply/Units'

    const submitAction = await postComponentAction(endpoint, [CatalogueTags.POWER_SUPPLY_UNITS])

    const unitParams = (await getComponentParams<PowerSupply.UnitParams>(endpoint, [CatalogueTags.GENERAL_COLOURS, CatalogueTags.GENERAL_MANUFACTURERS, CatalogueTags.POWER_SUPPLY_CONNECTORS, CatalogueTags.POWER_SUPPLY_MODULARITIES, CatalogueTags.POWER_SUPPLY_FORM_FACTORS, CatalogueTags.POWER_SUPPLY_EFFICIENCY_RATINGS])).data;

    return (
        <Form action={submitAction} params={unitParams}/>
    )
}