import {Form} from './form';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';
import { Fan } from '@/server/models/catalogue';
import {CatalogueTags} from '@/server/models/catalogue/tags';

export default async function Page() {

    const endpoint = '/api/Fan/Packs'

    const submitAction = await postComponentAction(endpoint, [CatalogueTags.FAN_PACKS])

    const packParams = (await getComponentParams<Fan.PackParams>(endpoint, [CatalogueTags.GENERAL_COLOURS, CatalogueTags.GENERAL_MANUFACTURERS, CatalogueTags.FAN_SIZES, CatalogueTags.IO_CONNECTORS])).data;

    return (
        <Form action={submitAction} params={packParams}/>
    )
}