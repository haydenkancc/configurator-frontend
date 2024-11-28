import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {SearchParams} from '@/server/models'
import {MemoryCapacityColumns, MemoryCapacityRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/Memory/MemoryCapacities'

    const [pageIndex, pageCapacity] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<MemoryCapacityRow>(endpoint, pageIndex, pageCapacity, ['MemoryCapacities']);
    const deleteAction = await deleteComponentAction(endpoint, ['MemoryCapacities'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new capacity
                </CreateButton>
            </Controls>
            <Table columns={MemoryCapacityColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}