import {PCIeBracket} from '@/server/models/components';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/PCIe/PCIeBrackets'

    const bracket = (await getComponent<PCIeBracket>(endpoint, id, ['PCIeBrackets'])).data;

    const action = await putComponentAction(endpoint, id, ['PCIeBrackets'])

    return (
        <Form item={bracket} action={action}/>
    )
}