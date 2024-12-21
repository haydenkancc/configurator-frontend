import {Body, Controls, CreateButton, Pagination, Table} from '@/components/catalogue/views/list-view';
import {SearchParams} from '@/server/models'
import { M2 } from '@/server/models/catalogue'
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/M2/FormFactors'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<M2.FormFactorListItem>(endpoint, pageIndex, pageSize, [CatalogueTags.M2_FORM_FACTORS]);
    const deleteAction = await deleteComponentAction(endpoint, [CatalogueTags.M2_FORM_FACTORS])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new form factor
                </CreateButton>
            </Controls>
            <Table columns={M2.FormFactorColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}