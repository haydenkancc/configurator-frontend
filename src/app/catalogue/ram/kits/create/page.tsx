import {Form} from './form';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';
import { Memory } from '@/server/models/catalogue';
import {CatalogueTags} from '@/server/models/catalogue/tags';

export default async function Page() {

    const endpoint = '/api/Memory/Kits'

    const submitAction = await postComponentAction(endpoint, [CatalogueTags.MEMORY_KITS])

    const kitParams = (await getComponentParams<Memory.KitParams>(endpoint, [CatalogueTags.GENERAL_COLOURS, CatalogueTags.GENERAL_MANUFACTURERS, CatalogueTags.MEMORY_TYPES, CatalogueTags.MEMORY_FORM_FACTORS])).data;

    return (
        <Form action={submitAction} params={kitParams}/>
    )
}