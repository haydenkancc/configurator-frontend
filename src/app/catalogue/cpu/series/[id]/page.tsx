import {CentralProcessor} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/CentralProcessor/Series'

    const series = (await getComponent<CentralProcessor.SeriesDto>(endpoint, id, [CatalogueTags.CENTRAL_PROCESSOR_SERIES])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.CENTRAL_PROCESSOR_SERIES])

    return (
        <Form item={series} action={action} params={null}/>
    )
}