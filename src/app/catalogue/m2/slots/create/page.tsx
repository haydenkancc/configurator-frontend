import {Form} from './form';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';
import { M2 } from '@/server/models/catalogue';

export default async function Page() {

    const endpoint = '/api/M2/Slots'

    const submitAction = await postComponentAction(endpoint, [CatalogueTags.M2_SLOTS])

    const slotParams = (await getComponentParams<M2.SlotParams>(endpoint, [CatalogueTags.M2_KEYS, CatalogueTags.M2_FORM_FACTORS, CatalogueTags.PCIE_SIZES, CatalogueTags.PCIE_VERSIONS])).data

    return (
        <Form action={submitAction} params={slotParams}/>
    )
}