import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';

export default async function Page() {

    const endpoint = '/api/Storage/CaseStorageFormFactors'

    const submitAction = await postComponentAction(endpoint, ['CaseStorageFormFactors'])

    return (
        <Form action={submitAction} />
    )
}