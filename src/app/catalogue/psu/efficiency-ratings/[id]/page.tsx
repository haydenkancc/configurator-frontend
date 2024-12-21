import { PowerSupply } from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/PowerSupply/EfficiencyRatings'

    const efficiencyRating = (await getComponent<PowerSupply.EfficiencyRatingDto>(endpoint, id, [CatalogueTags.POWER_SUPPLY_EFFICIENCY_RATINGS])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.POWER_SUPPLY_EFFICIENCY_RATINGS])

    return (
        <Form item={efficiencyRating} action={action} params={null}/>
    )
}