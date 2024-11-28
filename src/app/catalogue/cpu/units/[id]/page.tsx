import {CentralProcessorUnit} from '@/server/models/components';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/CentralProcessor/CentralProcessorUnits'

    const unit = (await getComponent<CentralProcessorUnit>(endpoint, id, ['CentralProcessorUnits'])).data;

    const action = await putComponentAction(endpoint, id, ['CentralProcessorUnits'])

    return (
        <Form item={unit} action={action}/>
    )
}