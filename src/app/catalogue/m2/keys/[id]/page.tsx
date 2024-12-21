import {M2} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/M2/Keys'

    const key = (await getComponent<M2.KeyDto>(endpoint, id, [CatalogueTags.M2_FORM_FACTORS])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.M2_FORM_FACTORS])

    const keyParams = (await getComponentParams<M2.KeyParams>(endpoint, [CatalogueTags.M2_KEYS])).data

    return (
        <Form item={key} action={action} params={keyParams}/>
    )
}