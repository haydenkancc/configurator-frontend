import {Form} from './form';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';
import {CentralProcessorUnitParams} from '@/server/models/components';

export default async function Page() {

    const endpoint = '/api/CentralProcessor/CentralProcessorUnits'

    const submitAction = await postComponentAction(endpoint, ['CentralProcessorUnits'])

    const unitParams = (await getComponentParams<CentralProcessorUnitParams>(endpoint, ['Manufacturers', 'CentralProcessorSockets', 'CentralProcessorSeries', 'CentralProcessorChannels', 'CentralProcessorCoreFamilies', 'MemoryCapacities'])).data

    return (
        <Form action={submitAction} params={unitParams} />
    )
}

