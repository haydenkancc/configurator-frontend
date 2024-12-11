import {Form} from './form';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';
import {FanPackParams} from '@/server/models/components';

export default async function Page() {

    const endpoint = '/api/Fan/FanPacks'

    const submitAction = await postComponentAction(endpoint, ['FanPacks'])

    const packParams = (await getComponentParams<FanPackParams>(endpoint, ['Manufacturers', 'FanSizes', 'IOConnectors'])).data

    console.log(packParams);

    return (
        <Form params={packParams} action={submitAction}/>
    )
}