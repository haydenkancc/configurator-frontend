import {Body, Controls, CreateButton, Pagination, Table} from '@/components/catalogue/views/list-view';
import {SearchParams} from '@/server/models'
import { General } from '@/server/models/catalogue'
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/General/Colours'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<General.ColourListItem>(endpoint, pageIndex, pageSize, [CatalogueTags.GENERAL_COLOURS]);
    const deleteAction = await deleteComponentAction(endpoint, [CatalogueTags.GENERAL_COLOURS])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new colour
                </CreateButton>
            </Controls>
            <Table columns={General.ColourColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}