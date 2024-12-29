import {GraphicsCard} from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/GraphicsCard/Units'

    const unit = (await getComponent<GraphicsCard.UnitDto>(endpoint, id, [CatalogueTags.GRAPHICS_CARD_UNITS])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.GRAPHICS_CARD_UNITS]);

    const unitParams = (await getComponentParams<GraphicsCard.UnitParams>(endpoint, [CatalogueTags.GENERAL_COLOURS, CatalogueTags.GENERAL_MANUFACTURERS, CatalogueTags.PCIE_BRACKETS, CatalogueTags.PCIE_VERSIONS, CatalogueTags.PCIE_SIZES, CatalogueTags.POWER_SUPPLY_CONNECTORS, CatalogueTags.GRAPHICS_CARD_CHIPSETS, CatalogueTags.MEMORY_TYPES])).data;

    console.log(unit);

    return (
        <Form item={unit} action={action} params={unitParams}/>
    )
}