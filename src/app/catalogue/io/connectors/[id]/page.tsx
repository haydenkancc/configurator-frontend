import {IOConnector, IOConnectorParams} from '@/server/models/components';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/IO/IOConnectors'

    const connectorParams = (await getComponentParams<IOConnectorParams>(endpoint, ['IOConnectors'])).data;

    const connector = (await getComponent<IOConnector>(endpoint, id, ['IOConnectors'])).data;

    const action = await putComponentAction(endpoint, id, ['IOConnectors'])

    return (
        <Form item={connector} action={action} params={connectorParams}/>
    )
}