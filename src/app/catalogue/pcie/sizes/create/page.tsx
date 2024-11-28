import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';

export default async function Page() {

    const endpoint = '/api/PCIe/PCIeSizes'

    const submitAction = await postComponentAction(endpoint, ['PCIeSizes'])

    return (
        <Form action={submitAction}/>
    )
}