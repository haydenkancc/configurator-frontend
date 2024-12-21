import {Body, Controls, CreateButton, Pagination, Table} from '@/components/catalogue/views/list-view';
import {SearchParams} from '@/server/models'
import { Storage } from '@/server/models/catalogue'
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/Storage/NandTypes'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<Storage.NandTypeListItem>(endpoint, pageIndex, pageSize, [CatalogueTags.STORAGE_NAND_TYPES]);
    const deleteAction = await deleteComponentAction(endpoint, [CatalogueTags.STORAGE_NAND_TYPES])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new NAND type
                </CreateButton>
            </Controls>
            <Table columns={Storage.NandTypeColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}