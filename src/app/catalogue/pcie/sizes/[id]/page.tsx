import {Pcie} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Pcie/Sizes'

    const size = (await getComponent<Pcie.SizeDto>(endpoint, id, [CatalogueTags.PCIE_SIZES])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.PCIE_SIZES])

    return (
        <Form item={size} action={action} params={null}/>
    )
}