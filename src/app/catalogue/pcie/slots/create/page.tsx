import {Form} from './form';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';
import { Pcie } from '@/server/models/catalogue';
import {CatalogueTags} from '@/server/models/catalogue/tags';

export default async function Page() {

    const endpoint = '/api/Pcie/Slots'

    const submitAction = await postComponentAction(endpoint, [CatalogueTags.PCIE_SLOTS])

    const slotParams = (await getComponentParams<Pcie.SlotParams>(endpoint, [CatalogueTags.PCIE_VERSIONS, CatalogueTags.PCIE_SIZES])).data;

    return (
        <Form action={submitAction} params={slotParams}/>
    )
}