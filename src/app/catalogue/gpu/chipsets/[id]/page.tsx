import {GraphicsProcessorChipset} from '@/server/models/components';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/GraphicsProcessor/GraphicsProcessorChipsets'

    const chipset = (await getComponent<GraphicsProcessorChipset>(endpoint, id, ['GraphicsProcessorChipsets'])).data;

    const action = await putComponentAction(endpoint, id, ['GraphicsProcessorChipsets'])

    return (
        <Form item={chipset} action={action}/>
    )
}