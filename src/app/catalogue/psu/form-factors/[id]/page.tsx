import { PowerSupply } from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/PowerSupply/FormFactors'

    const formFactor = (await getComponent<PowerSupply.FormFactorDto>(endpoint, id, [CatalogueTags.POWER_SUPPLY_FORM_FACTORS])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.POWER_SUPPLY_FORM_FACTORS])

    return (
        <Form item={formFactor} action={action} params={null}/>
    )
}