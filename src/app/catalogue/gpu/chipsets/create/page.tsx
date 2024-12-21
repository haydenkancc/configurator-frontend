import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';

export default async function Page() {

    const endpoint = '/api/GraphicsCard/Chipsets'

    const submitAction = await postComponentAction(endpoint, [CatalogueTags.GRAPHICS_CARD_CHIPSETS])

    return (
        <Form action={submitAction} params={null}/>
    )
}