import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';

export default async function Page() {

    const endpoint = '/api/PowerSupply/EfficiencyRatings'

    const submitAction = await postComponentAction(endpoint, [CatalogueTags.POWER_SUPPLY_EFFICIENCY_RATINGS])

    return (
        <Form action={submitAction} params={null}/>
    )
}