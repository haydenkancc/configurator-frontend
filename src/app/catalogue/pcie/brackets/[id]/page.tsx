import {Pcie} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Pcie/Brackets'

    const bracket = (await getComponent<Pcie.BracketDto>(endpoint, id, ['PcieBrackets'])).data;

    const action = await putComponentAction(endpoint, id, ['PcieBrackets'])

    return (
        <Form item={bracket} action={action}/>
    )
}