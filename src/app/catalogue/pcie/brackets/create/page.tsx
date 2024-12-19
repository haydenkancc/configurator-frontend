import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';

export default async function Page() {

    const endpoint = '/api/Pcie/Brackets'

    const submitAction = await postComponentAction(endpoint, ['PcieBrackets'])

    return (
        <Form action={submitAction}/>
    )
}