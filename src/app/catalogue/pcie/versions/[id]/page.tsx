import {PCIeVersion} from '@/server/models/components';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/PCIe/PCIeVersions'

    const version = (await getComponent<PCIeVersion>(endpoint, id, ['PCIeVersions'])).data;

    const action = await putComponentAction(endpoint, id, ['PCIeVersions'])

    return (
        <Form item={version} action={action}/>
    )
}