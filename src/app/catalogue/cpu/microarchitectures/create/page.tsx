import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';

export default async function Page() {

    const endpoint = '/api/CentralProcessor/CentralProcessorMicroarchitectures'

    const submitAction = await postComponentAction(endpoint, ['CentralProcessorMicroarchitectures'])

    return (
        <Form action={submitAction}/>
    )
}