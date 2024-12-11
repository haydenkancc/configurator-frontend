import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';

export default async function Page() {

    const endpoint = '/api/Fan/FanSizes'

    const submitAction = await postComponentAction(endpoint, ['FanSizes'])

    return (
        <Form action={submitAction} />
    )
}