import {Form} from './form';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';
import {CentralProcessor} from '@/server/models/catalogue';

export default async function Page() {

    const endpoint = '/api/CentralProcessor/CoreFamilies'

    const submitAction = await postComponentAction(endpoint, [CatalogueTags.CENTRAL_PROCESSOR_CORE_FAMILIES])

    const coreFamilyParams = (await getComponentParams<CentralProcessor.CoreFamilyParams>(endpoint,[CatalogueTags.CENTRAL_PROCESSOR_MICROARCHITECTURES])).data

    return (
        <Form action={submitAction} params={coreFamilyParams}/>
    )
}