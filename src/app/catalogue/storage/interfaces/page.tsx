import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {SearchParams} from '@/server/models'
import {StorageDriveInterfaceColumns, StorageDriveInterfaceRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/Storage/StorageDriveInterfaces'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<StorageDriveInterfaceRow>(endpoint, pageIndex, pageSize, ['StorageDriveInterfaces']);
    const deleteAction = await deleteComponentAction(endpoint, ['StorageDriveInterfaces'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new interface
                </CreateButton>
            </Controls>
            <Table columns={StorageDriveInterfaceColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}