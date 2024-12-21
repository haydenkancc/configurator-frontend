import {Form} from './form';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';
import { M2 } from '@/server/models/catalogue';

export default async function Page() {

    const endpoint = '/api/M2/Keys'

    const submitAction = await postComponentAction(endpoint, [CatalogueTags.M2_KEYS])

    const keyParams = (await getComponentParams<M2.KeyParams>(endpoint, [CatalogueTags.M2_KEYS])).data

    return (
        <Form action={submitAction} params={keyParams}/>
    )
}