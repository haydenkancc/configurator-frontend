import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home'
import {SearchParams} from '@/server/models';
import {GraphicsProcessorUnitColumns, GraphicsProcessorUnitRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/GraphicsProcessor/GraphicsProcessorUnits'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<GraphicsProcessorUnitRow>(endpoint, pageIndex, pageSize, ['GraphicsProcessorUnits', 'Manufacturers']);
    const deleteAction = await deleteComponentAction(endpoint, ['GraphicsProcessorUnits'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new unit
                </CreateButton>
            </Controls>
            <Table columns={GraphicsProcessorUnitColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination
                pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}
            />
        </Body>
    )
}