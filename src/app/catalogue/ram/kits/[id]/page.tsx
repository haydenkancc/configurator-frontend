import {Memory} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Memory/Kits'

    const kit = (await getComponent<Memory.KitDto>(endpoint, id, [CatalogueTags.MEMORY_KITS])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.MEMORY_KITS]);

    const kitParams = (await getComponentParams<Memory.KitParams>(endpoint, [CatalogueTags.GENERAL_COLOURS, CatalogueTags.GENERAL_MANUFACTURERS, CatalogueTags.MEMORY_TYPES, CatalogueTags.MEMORY_FORM_FACTORS])).data;

    return (
        <Form item={kit} action={action} params={kitParams}/>
    )
}