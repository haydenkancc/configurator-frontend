import {CentralProcessorSeries} from '@/server/models/components';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/CentralProcessor/CentralProcessorSeries'

    const series = (await getComponent<CentralProcessorSeries>(endpoint, id, ['CentralProcessorSeries'])).data;

    const action = await putComponentAction(endpoint, id, ['CentralProcessorSeries'])

    return (
        <Form item={series} action={action}/>
    )
}