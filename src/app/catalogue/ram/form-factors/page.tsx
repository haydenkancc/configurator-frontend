import {Body, Controls, CreateButton, Pagination, Table} from '@/components/catalogue/views/list-view';
import {SearchParams} from '@/server/models'
import { Memory } from '@/server/models/catalogue'
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/Memory/FormFactors'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<Memory.FormFactorListItem>(endpoint, pageIndex, pageSize, [CatalogueTags.MEMORY_FORM_FACTORS]);
    const deleteAction = await deleteComponentAction(endpoint, [CatalogueTags.MEMORY_FORM_FACTORS])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new form factor
                </CreateButton>
            </Controls>
            <Table columns={Memory.FormFactorColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}