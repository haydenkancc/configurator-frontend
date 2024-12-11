import {Form} from './form';
import {PowerSupplyConnectorParams} from '@/server/models/components';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';

export default async function Page() {
    const endpoint = '/api/PowerSupply/PowerSupplyConnectors'

    const connectorParams = (await getComponentParams<PowerSupplyConnectorParams>(endpoint, ['PowerSupplyConnectors'])).data;

    const submitAction = await postComponentAction(endpoint, ['PowerSupplyConnectors'])

    return (
        <Form params={connectorParams} action={submitAction} />
    )
}