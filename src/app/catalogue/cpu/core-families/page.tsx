import {Body, Controls, CreateButton, Pagination, Table} from '@/components/catalogue/views/list-view';
import {SearchParams} from '@/server/models'
import { CentralProcessor } from '@/server/models/catalogue'
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/CentralProcessor/CoreFamilies'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<CentralProcessor.CoreFamilyListItem>(endpoint, pageIndex, pageSize, [CatalogueTags.CENTRAL_PROCESSOR_CORE_FAMILIES]);
    const deleteAction = await deleteComponentAction(endpoint, [CatalogueTags.CENTRAL_PROCESSOR_CORE_FAMILIES])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new core family
                </CreateButton>
            </Controls>
            <Table columns={CentralProcessor.CoreFamilyColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}