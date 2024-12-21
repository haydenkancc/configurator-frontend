import {Body, Controls, CreateButton, Pagination, Table} from '@/components/catalogue/views/list-view';
import {SearchParams} from '@/server/models'
import { Pcie } from '@/server/models/catalogue'
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/Pcie/Slots'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<Pcie.SlotListItem>(endpoint, pageIndex, pageSize, [CatalogueTags.PCIE_SLOTS]);
    const deleteAction = await deleteComponentAction(endpoint, [CatalogueTags.PCIE_SLOTS])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new slot
                </CreateButton>
            </Controls>
            <Table columns={Pcie.SlotColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}