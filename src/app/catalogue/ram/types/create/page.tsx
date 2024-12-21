import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';

export default async function Page() {

    const endpoint = '/api/Memory/Types'

    const submitAction = await postComponentAction(endpoint, [CatalogueTags.MEMORY_TYPES])

    return (
        <Form action={submitAction} params={null}/>
    )
}