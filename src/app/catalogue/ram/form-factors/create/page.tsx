import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';

export default async function Page() {

    const endpoint = '/api/Memory/FormFactors'

    const submitAction = await postComponentAction(endpoint, [CatalogueTags.MEMORY_FORM_FACTORS])

    return (
        <Form action={submitAction} params={null}/>
    )
}