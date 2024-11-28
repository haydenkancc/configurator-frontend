import {CentralProcessorChannel} from '@/server/models/components';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/CentralProcessor/CentralProcessorChannels'

    const channel = (await getComponent<CentralProcessorChannel>(endpoint, id, ['CentralProcessorChannels'])).data;

    const action = await putComponentAction(endpoint, id, ['CentralProcessorChannels'])

    return (
        <Form item={channel} action={action}/>
    )
}