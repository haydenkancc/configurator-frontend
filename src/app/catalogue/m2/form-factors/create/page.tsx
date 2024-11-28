import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';

export default async function Page() {

    const endpoint = '/api/M2/M2FormFactors'

    const submitAction = await postComponentAction(endpoint, ['M2FormFactors'])

    return (
        <Form action={submitAction} />
    )
}