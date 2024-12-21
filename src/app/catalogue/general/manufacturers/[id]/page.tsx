import {General} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/General/Manufacturers'

    const manufacturer = (await getComponent<General.ManufacturerDto>(endpoint, id, [CatalogueTags.GENERAL_MANUFACTURERS])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.GENERAL_MANUFACTURERS])

    return (
        <Form item={manufacturer} action={action} params={null}/>
    )
}