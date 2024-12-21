import {PowerSupply} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/PowerSupply/Connectors'

    const connector = (await getComponent<PowerSupply.ConnectorDto>(endpoint, id, [CatalogueTags.POWER_SUPPLY_CONNECTORS])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.POWER_SUPPLY_CONNECTORS])

    const connectorParams = (await getComponentParams<PowerSupply.ConnectorParams>(endpoint, [CatalogueTags.POWER_SUPPLY_CONNECTORS])).data

    return (
        <Form item={connector} action={action} params={connectorParams}/>
    )
}