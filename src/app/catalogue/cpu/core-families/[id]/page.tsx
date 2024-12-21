import {CentralProcessor} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/CentralProcessor/CoreFamilies'

    const coreFamily = (await getComponent<CentralProcessor.CoreFamilyDto>(endpoint, id, [CatalogueTags.CENTRAL_PROCESSOR_CORE_FAMILIES])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.CENTRAL_PROCESSOR_CORE_FAMILIES]);

    const coreFamilyParams = (await getComponentParams<CentralProcessor.CoreFamilyParams>(endpoint,[CatalogueTags.CENTRAL_PROCESSOR_MICROARCHITECTURES])).data

    return (
        <Form item={coreFamily} action={action} params={coreFamilyParams}/>
    )
}