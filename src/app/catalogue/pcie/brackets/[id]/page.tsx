import {Pcie} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Pcie/Brackets'

    const bracket = (await getComponent<Pcie.BracketDto>(endpoint, id, [CatalogueTags.PCIE_BRACKETS])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.PCIE_BRACKETS])

    return (
        <Form item={bracket} action={action} params={null}/>
    )
}