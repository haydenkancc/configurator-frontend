import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';

export default async function Page() {

    const endpoint = '/api/Memory/MemoryCapacities'

    const submitAction = await postComponentAction(endpoint, ['MemoryCapacities'])

    return (
        <Form action={submitAction}/>
    )
}