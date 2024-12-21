import {Body, Controls, CreateButton, Pagination, Table} from '@/components/catalogue/views/list-view';
import {SearchParams} from '@/server/models'
import { GraphicsCard } from '@/server/models/catalogue'
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/GraphicsCard/Chipsets'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<GraphicsCard.ChipsetListItem>(endpoint, pageIndex, pageSize, [CatalogueTags.GRAPHICS_CARD_CHIPSETS]);
    const deleteAction = await deleteComponentAction(endpoint, [CatalogueTags.GRAPHICS_CARD_CHIPSETS])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new chipset
                </CreateButton>
            </Controls>
            <Table columns={GraphicsCard.ChipsetColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}