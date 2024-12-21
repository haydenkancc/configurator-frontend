import {Pcie} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Pcie/Slots'

    const slot = (await getComponent<Pcie.SlotDto>(endpoint, id, [CatalogueTags.PCIE_SLOTS])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.PCIE_SLOTS]);

    const slotParams = (await getComponentParams<Pcie.SlotParams>(endpoint, [CatalogueTags.PCIE_VERSIONS, CatalogueTags.PCIE_SIZES])).data;

    return (
        <Form item={slot} action={action} params={slotParams}/>
    )
}