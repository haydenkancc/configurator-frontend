import {GraphicsCard} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/GraphicsCard/Chipsets'

    const chipset = (await getComponent<GraphicsCard.ChipsetDto>(endpoint, id, [CatalogueTags.GRAPHICS_CARD_CHIPSETS])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.GRAPHICS_CARD_CHIPSETS])

    return (
        <Form item={chipset} action={action} params={null}/>
    )
}