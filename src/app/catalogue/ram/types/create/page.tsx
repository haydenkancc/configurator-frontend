import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';

export default async function Page() {

    const endpoint = '/api/Memory/MemoryTypes'

    const submitAction = await postComponentAction(endpoint, ['MemoryTypes'])

    return (
        <Form action={submitAction}/>
    )
}