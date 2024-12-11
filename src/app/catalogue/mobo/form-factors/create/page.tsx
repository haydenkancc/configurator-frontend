import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';

export default async function Page() {

    const endpoint = '/api/Motherboard/MotherboardFormFactors'

    const submitAction = await postComponentAction(endpoint, ['MotherboardFormFactors'])

    return (
        <Form action={submitAction} />
    )
}