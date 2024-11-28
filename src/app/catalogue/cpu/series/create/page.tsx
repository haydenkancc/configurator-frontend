import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';

export default async function Page() {

    const endpoint = '/api/CentralProcessor/CentralProcessorSeries'

    const submitAction = await postComponentAction(endpoint, ['CentralProcessorSeries'])

    return (
        <Form action={submitAction}/>
    )
}