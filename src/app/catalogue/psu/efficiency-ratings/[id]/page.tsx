import {PowerSupplyEfficiencyRating} from '@/server/models/components';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/PowerSupply/PowerSupplyEfficiencyRatings'

    const efficiencyRating = (await getComponent<PowerSupplyEfficiencyRating>(endpoint, id, ['PowerSupplyEfficiencyRatings'])).data;

    const action = await putComponentAction(endpoint, id, ['PowerSupplyEfficiencyRatings'])

    return (
        <Form item={efficiencyRating} action={action}/>
    )
}