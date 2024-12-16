import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home'
import {SearchParams} from '@/server/models';
import {StorageUnitColumns, StorageUnitRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/Storage/StorageUnits'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<StorageUnitRow>(endpoint, pageIndex, pageSize, ['Manufacturers', 'StorageUnits']);
    const deleteAction = await deleteComponentAction(endpoint, ['StorageUnits'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new unit
                </CreateButton>
            </Controls>
            <Table columns={StorageUnitColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination
                pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}
            />
        </Body>
    )
}