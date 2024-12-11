import {PowerSupplyConnector, PowerSupplyConnectorParams} from '@/server/models/components';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/PowerSupply/PowerSupplyConnectors'

    const connectorParams = (await getComponentParams<PowerSupplyConnectorParams>(endpoint, ['PowerSupplyConnectors'])).data;

    const connector = (await getComponent<PowerSupplyConnector>(endpoint, id, ['PowerSupplyConnectors'])).data;

    const action = await putComponentAction(endpoint, id, ['PowerSupplyConnectors'])

    return (
        <Form item={connector} action={action} params={connectorParams}/>
    )
}