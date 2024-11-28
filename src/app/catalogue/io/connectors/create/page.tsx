import {Form} from './form';
import {IOConnectorParams} from '@/server/models/components';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';

export default async function Page() {
    const endpoint = '/api/IO/IOConnectors'

    const connectorParams = (await getComponentParams<IOConnectorParams>(endpoint, ['IOConnectors'])).data;

    const submitAction = await postComponentAction(endpoint, ['IOConnectors'])

    return (
        <Form params={connectorParams} action={submitAction} />
    )
}