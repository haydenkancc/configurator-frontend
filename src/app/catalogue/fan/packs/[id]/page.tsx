import {FanPack, FanPackParams} from '@/server/models/components';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Fan/FanPacks'

    const pack = (await getComponent<FanPack>(endpoint, id, ['FanPacks'])).data;

    const action = await putComponentAction(endpoint, id, ['FanPacks'])

    const packParams = (await getComponentParams<FanPackParams>(endpoint, ['Manufacturers', 'FanSizes', 'IOConnectors'])).data

    return (
        <Form item={pack} action={action} params={packParams} />
    )
}