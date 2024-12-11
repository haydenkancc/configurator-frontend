import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home'
import {SearchParams} from '@/server/models';
import {MemoryKitColumns, MemoryKitRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/Memory/MemoryKits'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<MemoryKitRow>(endpoint, pageIndex, pageSize, ['MemoryKits', 'Manufacturers']);
    const deleteAction = await deleteComponentAction(endpoint, ['MemoryKits'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new kit
                </CreateButton>
            </Controls>
            <Table columns={MemoryKitColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination
                pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}
            />
        </Body>
    )
}