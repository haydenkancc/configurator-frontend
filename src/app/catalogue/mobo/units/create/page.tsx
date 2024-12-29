import {Form} from './form';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';
import { Motherboard } from '@/server/models/catalogue';
import {CatalogueTags} from '@/server/models/catalogue/tags';

export default async function Page() {

    const endpoint = '/api/Motherboard/Units'

    const submitAction = await postComponentAction(endpoint, [CatalogueTags.MOTHERBOARD_UNITS])

    const unitParams = (await getComponentParams<Motherboard.UnitParams>(endpoint, [CatalogueTags.GENERAL_COLOURS, CatalogueTags.GENERAL_MANUFACTURERS, CatalogueTags.MOTHERBOARD_FORM_FACTORS])).data;

    console.log(unitParams);

    return (
        <Form action={submitAction} params={unitParams}/>
    )
}