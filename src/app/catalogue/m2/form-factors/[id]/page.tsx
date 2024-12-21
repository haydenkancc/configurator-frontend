import {M2} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/M2/FormFactors'

    const formFactor = (await getComponent<M2.FormFactorDto>(endpoint, id, [CatalogueTags.M2_FORM_FACTORS])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.M2_FORM_FACTORS])

    return (
        <Form item={formFactor} action={action} params={null}/>
    )
}