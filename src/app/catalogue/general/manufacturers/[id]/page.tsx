import {Manufacturer} from '@/server/models/components';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Manufacturers'

    const manufacturer = (await getComponent<Manufacturer>(endpoint, id, ['Manufacturers'])).data;

    const action = await putComponentAction(endpoint, id, ['Manufacturers'])

    return (
        <Form item={manufacturer} action={action}/>
    )
}