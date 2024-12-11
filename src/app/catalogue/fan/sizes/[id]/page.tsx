import {FanSize} from '@/server/models/components';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Fan/FanSizes'

    const size = (await getComponent<FanSize>(endpoint, id, ['FanSizes'])).data;

    const action = await putComponentAction(endpoint, id, ['FanSizes'])

    return (
        <Form item={size} action={action}/>
    )
}