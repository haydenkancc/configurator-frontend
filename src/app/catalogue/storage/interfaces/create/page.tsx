import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';

export default async function Page() {

    const endpoint = '/api/Storage/ConnectionInterfaces'

    const submitAction = await postComponentAction(endpoint, [CatalogueTags.STORAGE_CONNECTION_INTERFACES])

    return (
        <Form action={submitAction} params={null}/>
    )
}