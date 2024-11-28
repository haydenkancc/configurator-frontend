import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {SearchParams} from '@/server/models'
import {PCIeSizeColumns, PCIeSizeRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/PCIe/PCIeSizes'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<PCIeSizeRow>(endpoint, pageIndex, pageSize, ['PCIeSizes']);
    const deleteAction = await deleteComponentAction(endpoint, ['PCIeSizes'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new size
                </CreateButton>
            </Controls>
            <Table columns={PCIeSizeColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}