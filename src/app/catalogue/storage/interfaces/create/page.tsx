import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';

export default async function Page() {

    const endpoint = '/api/Storage/StorageDriveInterfaces'

    const submitAction = await postComponentAction(endpoint, ['StorageDriveInterfaces'])

    return (
        <Form action={submitAction}/>
    )
}