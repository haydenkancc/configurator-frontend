import {Form} from './form';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';
import {Motherboard} from '@/server/models/catalogue';

export default async function Page() {

    const endpoint = '/api/Motherboard/Chipsets'

    const submitAction = await postComponentAction(endpoint, [CatalogueTags.MOTHERBOARD_CHIPSETS])

    const chipsetParams = (await getComponentParams<Motherboard.ChipsetParams>(endpoint, [CatalogueTags.CENTRAL_PROCESSOR_SOCKETS])).data

    return (
        <Form action={submitAction} params={chipsetParams}/>
    )
}