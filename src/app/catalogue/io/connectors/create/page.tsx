import {Form} from './form';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';
import { IO } from '@/server/models/catalogue';

export default async function Page() {

    const endpoint = '/api/IO/Connectors'

    const submitAction = await postComponentAction(endpoint, [CatalogueTags.IO_CONNECTORS])

    const connectorParams = (await getComponentParams<IO.ConnectorParams>(endpoint, [CatalogueTags.IO_CONNECTORS])).data

    return (
        <Form action={submitAction} params={connectorParams}/>
    )
}