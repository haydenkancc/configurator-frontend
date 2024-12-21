import {Memory} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Memory/Types'

    const type = (await getComponent<Memory.TypeDto>(endpoint, id, [CatalogueTags.MEMORY_TYPES])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.MEMORY_TYPES])

    return (
        <Form item={type} action={action} params={null}/>
    )
}