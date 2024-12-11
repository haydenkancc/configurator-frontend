import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';

export default async function Page() {

    const endpoint = '/api/PowerSupply/PowerSupplyEfficiencyRatings'

    const submitAction = await postComponentAction(endpoint, ['PowerSupplyEfficiencyRatings'])

    return (
        <Form action={submitAction} />
    )
}