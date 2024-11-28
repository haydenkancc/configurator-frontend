import {CentralProcessorMicroarchitecture} from '@/server/models/components';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/CentralProcessor/CentralProcessorMicroarchitectures'

    const microarchitecture = (await getComponent<CentralProcessorMicroarchitecture>(endpoint, id, ['CentralProcessorMicroarchitectures'])).data;

    const action = await putComponentAction(endpoint, id, ['CentralProcessorMicroarchitectures'])

    return (
        <Form item={microarchitecture} action={action}/>
    )
}