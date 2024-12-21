import {Body, Controls, CreateButton, Pagination, Table} from '@/components/catalogue/views/list-view';
import {SearchParams} from '@/server/models'
import { IO } from '@/server/models/catalogue'
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/IO/Connectors'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<IO.ConnectorListItem>(endpoint, pageIndex, pageSize, [CatalogueTags.IO_CONNECTORS]);
    const deleteAction = await deleteComponentAction(endpoint, [CatalogueTags.IO_CONNECTORS])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new connector
                </CreateButton>
            </Controls>
            <Table columns={IO.ConnectorColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}