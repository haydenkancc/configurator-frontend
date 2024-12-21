import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';

export default async function Page() {

    const endpoint = '/api/General/Manufacturers'

    const submitAction = await postComponentAction(endpoint, [CatalogueTags.GENERAL_MANUFACTURERS])

    return (
        <Form action={submitAction} params={null}/>
    )
}