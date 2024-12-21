import {Body, Controls, CreateButton, Pagination, Table} from '@/components/catalogue/views/list-view';
import {SearchParams} from '@/server/models'
import { General } from '@/server/models/catalogue'
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/General/Manufacturers'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<General.ManufacturerListItem>(endpoint, pageIndex, pageSize, [CatalogueTags.GENERAL_MANUFACTURERS]);
    const deleteAction = await deleteComponentAction(endpoint, [CatalogueTags.GENERAL_MANUFACTURERS])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new manufacturer
                </CreateButton>
            </Controls>
            <Table columns={General.ManufacturerColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}