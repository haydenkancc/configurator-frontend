import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';

export default async function Page() {

    const endpoint = '/api/CentralProcessor/Sockets'

    const submitAction = await postComponentAction(endpoint, [CatalogueTags.CENTRAL_PROCESSOR_SOCKETS])

    return (
        <Form action={submitAction} params={null}/>
    )
}