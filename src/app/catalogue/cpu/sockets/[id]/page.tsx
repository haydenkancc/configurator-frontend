import {CentralProcessorSocket} from '@/server/models/components';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/CentralProcessor/CentralProcessorSockets'

    const socket = (await getComponent<CentralProcessorSocket>(endpoint, id, ['CentralProcessorSockets'])).data;

    const action = await putComponentAction(endpoint, id, ['CentralProcessorSockets'])

    return (
        <Form item={socket} action={action}/>
    )
}