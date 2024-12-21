import {CentralProcessor} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/CentralProcessor/Sockets'

    const socket = (await getComponent<CentralProcessor.SocketDto>(endpoint, id, [CatalogueTags.CENTRAL_PROCESSOR_SOCKETS])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.CENTRAL_PROCESSOR_SOCKETS])

    return (
        <Form item={socket} action={action} params={null}/>
    )
}