import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';

export default async function Page() {

    const endpoint = '/api/PCIe/PCIeBrackets'

    const submitAction = await postComponentAction(endpoint, ['PCIeBrackets'])

    return (
        <Form action={submitAction}/>
    )
}