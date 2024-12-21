import {Body, Controls, CreateButton, Pagination, Table} from '@/components/catalogue/views/list-view';
import {SearchParams} from '@/server/models'
import { Memory } from '@/server/models/catalogue'
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/Memory/Types'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<Memory.TypeListItem>(endpoint, pageIndex, pageSize, [CatalogueTags.MEMORY_TYPES]);
    const deleteAction = await deleteComponentAction(endpoint, [CatalogueTags.MEMORY_TYPES])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new type
                </CreateButton>
            </Controls>
            <Table columns={Memory.TypeColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}