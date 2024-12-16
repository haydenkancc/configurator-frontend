import {StorageDriveInterface} from '@/server/models/components';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Storage/StorageDriveInterfaces'

    const type = (await getComponent<StorageDriveInterface>(endpoint, id, ['StorageDriveInterfaces'])).data;

    const action = await putComponentAction(endpoint, id, ['StorageDriveInterfaces'])

    return (
        <Form item={type} action={action}/>
    )
}