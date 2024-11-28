import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';

export default async function Page() {

    const endpoint = '/api/PCIe/PCIeVersions'

    const submitAction = await postComponentAction(endpoint, ['PCIeVersions'])

    return (
        <Form action={submitAction}/>
    )
}