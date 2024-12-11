import {Form} from './form';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';
import {MotherboardUnitParams} from '@/server/models/components';

export default async function Page() {

    const endpoint = '/api/Motherboard/MotherboardUnits'

    const submitAction = await postComponentAction(endpoint, ['MotherboardUnits'])

    const unitParams = (await getComponentParams<MotherboardUnitParams>(endpoint, ['Manufacturers', 'MotherboardChipsets', 'MotherboardFormFactors', 'MemoryFormFactors', 'MemoryTypes', 'MemoryCapacities', 'CentralProcessorChannels', 'IOConnectors', 'PowerSupplyConnectors', 'M2Slots', 'PCIeSlots'])).data

    return (
        <Form action={submitAction} params={unitParams} />
    )
}

