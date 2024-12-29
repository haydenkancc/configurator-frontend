import { Motherboard } from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Motherboard/FormFactors'

    const formFactor = (await getComponent<Motherboard.FormFactorDto>(endpoint, id, [CatalogueTags.MOTHERBOARD_FORM_FACTORS])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.MOTHERBOARD_FORM_FACTORS])

    return (
        <Form item={formFactor} action={action} params={null}/>
    )
}