import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';

export default async function Page() {

    const endpoint = '/api/CentralProcessor/CentralProcessorChannels'

    const submitAction = await postComponentAction(endpoint, ['CentralProcessorChannels'])

    return (
        <Form action={submitAction}/>
    )
}