import {Body, Controls, CreateButton, Pagination, Table} from '@/components/catalogue/views/list-view';
import {SearchParams} from '@/server/models'
import { M2 } from '@/server/models/catalogue'
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/M2/Slots'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<M2.SlotListItem>(endpoint, pageIndex, pageSize, [CatalogueTags.M2_SLOTS]);
    const deleteAction = await deleteComponentAction(endpoint, [CatalogueTags.M2_SLOTS])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new slot
                </CreateButton>
            </Controls>
            <Table columns={M2.SlotColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}