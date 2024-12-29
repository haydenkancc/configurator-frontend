import {Body, Controls, CreateButton, Pagination, Table} from '@/components/catalogue/views/list-view';
import {SearchParams} from '@/server/models'
import { Motherboard } from '@/server/models/catalogue'
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/Motherboard/Chipsets'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<Motherboard.ChipsetListItem>(endpoint, pageIndex, pageSize, [CatalogueTags.MOTHERBOARD_CHIPSETS]);
    const deleteAction = await deleteComponentAction(endpoint, [CatalogueTags.MOTHERBOARD_CHIPSETS])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new chipset
                </CreateButton>
            </Controls>
            <Table columns={Motherboard.ChipsetColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}