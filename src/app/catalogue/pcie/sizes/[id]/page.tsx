import {PCIeSize} from '@/server/models/components';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/PCIe/PCIeSizes'

    const size = (await getComponent<PCIeSize>(endpoint, id, ['PCIeSizes'])).data;

    const action = await putComponentAction(endpoint, id, ['PCIeSizes'])

    return (
        <Form item={size} action={action}/>
    )
}