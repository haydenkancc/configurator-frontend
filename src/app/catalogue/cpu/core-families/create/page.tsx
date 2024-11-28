import {Form} from './form';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';
import {CentralProcessorCoreFamilyParams} from '@/server/models/components';

export default async function Page() {

    const endpoint = '/api/CentralProcessor/CentralProcessorCoreFamilies'

    const submitAction = await postComponentAction(endpoint, ['CentralProcessorCoreFamilies'])

    const coreFamilyParams = (await getComponentParams<CentralProcessorCoreFamilyParams>(endpoint, ['CentralProcessorMicroarchitectures'])).data

    return (
        <Form action={submitAction} params={coreFamilyParams} />
    )
}