import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {SearchParams} from '@/server/models'
import {MemoryTypeColumns, MemoryTypeRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/Memory/MemoryTypes'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<MemoryTypeRow>(endpoint, pageIndex, pageSize, ['MemoryTypes']);
    const deleteAction = await deleteComponentAction(endpoint, ['MemoryTypes'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new type
                </CreateButton>
            </Controls>
            <Table columns={MemoryTypeColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}