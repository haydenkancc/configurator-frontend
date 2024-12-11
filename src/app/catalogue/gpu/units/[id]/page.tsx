import {GraphicsProcessorUnit, GraphicsProcessorUnitParams} from '@/server/models/components';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/GraphicsProcessor/GraphicsProcessorUnits'

    const unit = (await getComponent<GraphicsProcessorUnit>(endpoint, id, ['GraphicsProcessorUnits'])).data;

    const unitParams = (await getComponentParams<GraphicsProcessorUnitParams>(endpoint, ['Manufacturers', 'GraphicsProcessorChipsets', 'MemoryCapacities', 'MemoryTypes', 'PowerSupplyConnectors', 'PCIeBrackets', 'PCIeVersions', 'PCIeSizes'])).data


    const action = await putComponentAction(endpoint, id, ['GraphicsProcessorUnits'])

    return (
        <Form item={unit} action={action} params={unitParams}/>
    )
}