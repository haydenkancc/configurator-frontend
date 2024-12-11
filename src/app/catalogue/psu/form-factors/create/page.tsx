import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';

export default async function Page() {

    const endpoint = '/api/PowerSupply/PowerSupplyFormFactors'

    const submitAction = await postComponentAction(endpoint, ['PowerSupplyFormFactors'])

    return (
        <Form action={submitAction} />
    )
}