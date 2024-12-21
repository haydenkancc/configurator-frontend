import {Body, Controls, CreateButton, Pagination, Table} from '@/components/catalogue/views/list-view';
import {SearchParams} from '@/server/models'
import { Storage } from '@/server/models/catalogue'
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/Storage/FormFactors'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<Storage.FormFactorListItem>(endpoint, pageIndex, pageSize, [CatalogueTags.STORAGE_FORM_FACTORS]);
    const deleteAction = await deleteComponentAction(endpoint, [CatalogueTags.STORAGE_FORM_FACTORS])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new form factor
                </CreateButton>
            </Controls>
            <Table columns={Storage.FormFactorColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}