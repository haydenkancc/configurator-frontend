import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';

export default async function Page() {

    const endpoint = '/api/CentralProcessor/CentralProcessorSockets'

    const submitAction = await postComponentAction(endpoint, ['CentralProcessorSockets'])

    return (
        <Form action={submitAction}/>
    )
}