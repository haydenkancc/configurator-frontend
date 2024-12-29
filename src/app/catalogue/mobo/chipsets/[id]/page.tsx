import {Motherboard} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Motherboard/Chipsets'

    const chipset = (await getComponent<Motherboard.ChipsetDto>(endpoint, id, [CatalogueTags.MOTHERBOARD_CHIPSETS])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.MOTHERBOARD_CHIPSETS])

    const chipsetParams = (await getComponentParams<Motherboard.ChipsetParams>(endpoint, [CatalogueTags.CENTRAL_PROCESSOR_SOCKETS])).data

    return (
        <Form item={chipset} action={action} params={chipsetParams}/>
    )
}