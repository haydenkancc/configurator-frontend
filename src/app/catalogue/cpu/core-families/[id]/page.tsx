import {CentralProcessorCoreFamily, CentralProcessorCoreFamilyParams} from '@/server/models/components';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/CentralProcessor/CentralProcessorCoreFamilies'

    const coreFamily = (await getComponent<CentralProcessorCoreFamily>(endpoint, id, ['CentralProcessorCoreFamilies'])).data;

    const action = await putComponentAction(endpoint, id, ['CentralProcessorCoreFamilies'])

    const coreFamilyParams = (await getComponentParams<CentralProcessorCoreFamilyParams>(endpoint, ['CentralProcessorMicroarchitectures'])).data

    return (
        <Form item={coreFamily} action={action} params={coreFamilyParams}/>
    )
}