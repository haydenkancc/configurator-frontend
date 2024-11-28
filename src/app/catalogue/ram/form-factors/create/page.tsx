import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';

export default async function Page() {

    const endpoint = '/api/Memory/MemoryFormFactors'

    const submitAction = await postComponentAction(endpoint, ['MemoryFormFactors'])

    return (
        <Form action={submitAction} />
    )
}