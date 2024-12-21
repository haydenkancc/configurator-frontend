import {General} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/General/Colours'

    const colour = (await getComponent<General.ColourDto>(endpoint, id, [CatalogueTags.GENERAL_COLOURS])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.GENERAL_COLOURS])

    return (
        <Form item={colour} action={action} params={null}/>
    )
}