import {Fan} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Fan/Packs'

    const pack = (await getComponent<Fan.PackDto>(endpoint, id, [CatalogueTags.FAN_PACKS, CatalogueTags.IO_CONNECTORS])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.FAN_PACKS]);

    const packParams = (await getComponentParams<Fan.PackParams>(endpoint, [CatalogueTags.GENERAL_COLOURS, CatalogueTags.GENERAL_MANUFACTURERS, CatalogueTags.FAN_SIZES, CatalogueTags.IO_CONNECTORS])).data;

    console.log(pack)
    return (
        <Form item={pack} action={action} params={packParams}/>
    )
}