import {Pcie} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Pcie/Versions'

    const version = (await getComponent<Pcie.VersionDto>(endpoint, id, [CatalogueTags.PCIE_VERSIONS])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.PCIE_VERSIONS])

    return (
        <Form item={version} action={action} params={null}/>
    )
}