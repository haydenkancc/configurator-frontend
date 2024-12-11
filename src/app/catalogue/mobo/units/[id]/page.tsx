import {MotherboardUnit, MotherboardUnitParams} from '@/server/models/components';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Motherboard/MotherboardUnits'

    const unit = (await getComponent<MotherboardUnit>(endpoint, id, ['MotherboardUnits'])).data;

    const unitParams = (await getComponentParams<MotherboardUnitParams>(endpoint, ['Manufacturers', 'MotherboardChipsets', 'MotherboardFormFactors', 'MemoryFormFactors', 'MemoryTypes', 'MemoryCapacities', 'CentralProcessorChannels', 'IOConnectors', 'PowerSupplyConnectors', 'M2Slots', 'PCIeSlots'])).data


    const action = await putComponentAction(endpoint, id, ['MotherboardUnits'])

    return (
        <Form item={unit} action={action} params={unitParams}/>
    )
}