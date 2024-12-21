import {Form} from './form';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';
import { CentralProcessor } from '@/server/models/catalogue';
import {CatalogueTags} from '@/server/models/catalogue/tags';

export default async function Page() {

    const endpoint = '/api/CentralProcessor/Units'

    const submitAction = await postComponentAction(endpoint, [CatalogueTags.CENTRAL_PROCESSOR_UNITS])

    const unitParams = (await getComponentParams<CentralProcessor.UnitParams>(endpoint, [CatalogueTags.GENERAL_COLOURS, CatalogueTags.GENERAL_MANUFACTURERS, CatalogueTags.CENTRAL_PROCESSOR_CORE_FAMILIES, CatalogueTags.CENTRAL_PROCESSOR_CHANNELS, CatalogueTags.CENTRAL_PROCESSOR_SOCKETS, CatalogueTags.CENTRAL_PROCESSOR_SERIES])).data;

    console.log(unitParams);

    return (
        <Form action={submitAction} params={unitParams}/>
    )
}