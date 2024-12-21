import {IO} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/IO/Connectors'

    const connector = (await getComponent<IO.ConnectorDto>(endpoint, id, [CatalogueTags.IO_CONNECTORS])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.IO_CONNECTORS])

    const connectorParams = (await getComponentParams<IO.ConnectorParams>(endpoint, [CatalogueTags.IO_CONNECTORS])).data

    return (
        <Form item={connector} action={action} params={connectorParams}/>
    )
}