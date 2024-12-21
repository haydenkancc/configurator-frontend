import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';

export default async function Page() {

    const endpoint = '/api/PowerSupply/Modularities'

    const submitAction = await postComponentAction(endpoint, [CatalogueTags.POWER_SUPPLY_MODULARITIES])

    return (
        <Form action={submitAction} params={null}/>
    )
}