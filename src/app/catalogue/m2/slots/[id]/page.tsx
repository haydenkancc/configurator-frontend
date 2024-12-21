import {M2} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/M2/Slots'

    const slot = (await getComponent<M2.SlotDto>(endpoint, id, [CatalogueTags.M2_SLOTS, CatalogueTags.M2_FORM_FACTORS])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.M2_SLOTS])

    const slotParams = (await getComponentParams<M2.SlotParams>(endpoint, [CatalogueTags.M2_KEYS, CatalogueTags.M2_FORM_FACTORS, CatalogueTags.PCIE_SIZES, CatalogueTags.PCIE_VERSIONS])).data

    console.log(slotParams)

    return (
        <Form item={slot} action={action} params={slotParams}/>
    )
}