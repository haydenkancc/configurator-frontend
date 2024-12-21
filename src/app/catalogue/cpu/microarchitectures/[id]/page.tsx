import {CentralProcessor} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/CentralProcessor/Microarchitectures'

    const microarchitecture = (await getComponent<CentralProcessor.MicroarchitectureDto>(endpoint, id, [CatalogueTags.CENTRAL_PROCESSOR_MICROARCHITECTURES])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.CENTRAL_PROCESSOR_MICROARCHITECTURES])

    return (
        <Form item={microarchitecture} action={action} params={null}/>
    )
}