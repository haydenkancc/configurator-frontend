import {Form} from './form';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';
import { PowerSupply } from '@/server/models/catalogue';

export default async function Page() {

    const endpoint = '/api/PowerSupply/Connectors'

    const submitAction = await postComponentAction(endpoint, [CatalogueTags.POWER_SUPPLY_CONNECTORS])

    const connectorParams = (await getComponentParams<PowerSupply.ConnectorParams>(endpoint, [CatalogueTags.POWER_SUPPLY_CONNECTORS])).data

    return (
        <Form action={submitAction} params={connectorParams}/>
    )
}