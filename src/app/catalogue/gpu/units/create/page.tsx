import {Form} from './form';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';
import {GraphicsProcessorUnitParams} from '@/server/models/components';

export default async function Page() {

    const endpoint = '/api/GraphicsProcessor/GraphicsProcessorUnits'

    const submitAction = await postComponentAction(endpoint, ['GraphicsProcessorUnits'])

    const unitParams = (await getComponentParams<GraphicsProcessorUnitParams>(endpoint, ['Manufacturers', 'GraphicsProcessorChipsets', 'MemoryCapacities', 'MemoryTypes', 'PowerSupplyConnectors', 'PCIeBrackets', 'PCIeVersions', 'PCIeSizes'])).data

    console.log(unitParams);

    return (
        <Form params={unitParams} action={submitAction}/>
    )
}