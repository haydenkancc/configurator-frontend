import {MotherboardChipset, MotherboardChipsetParams} from '@/server/models/components';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Motherboard/MotherboardChipsets'

    const chipset = (await getComponent<MotherboardChipset>(endpoint, id, ['MotherboardChipsets'])).data;

    const action = await putComponentAction(endpoint, id, ['MotherboardChipsets'])

    const chipsetParams = (await getComponentParams<MotherboardChipsetParams>(endpoint, ['CentralProcessorSockets'])).data

    return (
        <Form item={chipset} action={action} params={chipsetParams}/>
    )
}