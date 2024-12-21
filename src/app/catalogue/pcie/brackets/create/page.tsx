import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';

export default async function Page() {

    const endpoint = '/api/Pcie/Brackets'

    const submitAction = await postComponentAction(endpoint, [CatalogueTags.PCIE_BRACKETS])

    return (
        <Form action={submitAction} params={null}/>
    )
}