import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';

export default async function Page() {

    const endpoint = '/api/Manufacturers'

    const submitAction = await postComponentAction(endpoint, ['Manufacturers'])

    return (
        <Form action={submitAction}/>
    )
}