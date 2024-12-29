import {CentralProcessor} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/CentralProcessor/Units'

    const unit = (await getComponent<CentralProcessor.UnitDto>(endpoint, id, [CatalogueTags.CENTRAL_PROCESSOR_UNITS])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.CENTRAL_PROCESSOR_UNITS]);

    const unitParams = (await getComponentParams<CentralProcessor.UnitParams>(endpoint, [CatalogueTags.GENERAL_COLOURS, CatalogueTags.GENERAL_MANUFACTURERS, CatalogueTags.CENTRAL_PROCESSOR_CORE_FAMILIES, CatalogueTags.CENTRAL_PROCESSOR_CHANNELS, CatalogueTags.CENTRAL_PROCESSOR_SOCKETS, CatalogueTags.CENTRAL_PROCESSOR_SERIES])).data;

    return (
        <Form item={unit} action={action} params={unitParams}/>
    )
}