import {Form} from './form';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';
import { GraphicsCard } from '@/server/models/catalogue';
import {CatalogueTags} from '@/server/models/catalogue/tags';

export default async function Page() {

    const endpoint = '/api/GraphicsCard/Units'

    const submitAction = await postComponentAction(endpoint, [CatalogueTags.GRAPHICS_CARD_UNITS])

    const unitParams = (await getComponentParams<GraphicsCard.UnitParams>(endpoint, [CatalogueTags.GENERAL_COLOURS, CatalogueTags.GENERAL_MANUFACTURERS, CatalogueTags.PCIE_BRACKETS, CatalogueTags.PCIE_VERSIONS, CatalogueTags.PCIE_SIZES, CatalogueTags.POWER_SUPPLY_CONNECTORS, CatalogueTags.GRAPHICS_CARD_CHIPSETS, CatalogueTags.MEMORY_TYPES])).data;

    console.log(unitParams);

    return (
        <Form action={submitAction} params={unitParams}/>
    )
}