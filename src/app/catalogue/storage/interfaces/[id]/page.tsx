import { Storage } from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Storage/ConnectionInterfaces'

    const connectionInterface = (await getComponent<Storage.ConnectionInterfaceDto>(endpoint, id, [CatalogueTags.STORAGE_CONNECTION_INTERFACES])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.STORAGE_CONNECTION_INTERFACES])

    return (
        <Form item={connectionInterface} action={action} params={null}/>
    )
}