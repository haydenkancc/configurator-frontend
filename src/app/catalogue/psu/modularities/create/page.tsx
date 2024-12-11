import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';

export default async function Page() {

    const endpoint = '/api/PowerSupply/PowerSupplyModularities'

    const submitAction = await postComponentAction(endpoint, ['PowerSupplyModularities'])

    return (
        <Form action={submitAction} />
    )
}