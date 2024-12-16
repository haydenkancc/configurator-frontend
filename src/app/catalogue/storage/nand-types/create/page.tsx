import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';

export default async function Page() {

    const endpoint = '/api/Storage/SolidStateDriveNandTypes'

    const submitAction = await postComponentAction(endpoint, ['SolidStateDriveNandTypes'])

    return (
        <Form action={submitAction}/>
    )
}