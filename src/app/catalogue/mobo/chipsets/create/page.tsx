import {Form} from './form';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';
import {MotherboardChipsetParams} from '@/server/models/components';

export default async function Page() {

    const endpoint = '/api/Motherboard/MotherboardChipsets'

    const submitAction = await postComponentAction(endpoint, ['MotherboardChipsets'])

    const chipsetParams = (await getComponentParams<MotherboardChipsetParams>(endpoint, ['CentralProcessorSockets'])).data

    return (
        <Form action={submitAction} params={chipsetParams} />
    )
}