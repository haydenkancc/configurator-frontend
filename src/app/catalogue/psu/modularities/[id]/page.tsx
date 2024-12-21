import {PowerSupply} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/PowerSupply/Modularities'

    const modularity = (await getComponent<PowerSupply.ModularityDto>(endpoint, id, [CatalogueTags.POWER_SUPPLY_MODULARITIES])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.POWER_SUPPLY_MODULARITIES])

    return (
        <Form item={modularity} action={action} params={null}/>
    )
}