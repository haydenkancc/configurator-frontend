import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {SearchParams} from '@/server/models'
import {GraphicsProcessorChipsetColumns, GraphicsProcessorChipsetRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/GraphicsProcessor/GraphicsProcessorChipsets'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<GraphicsProcessorChipsetRow>(endpoint, pageIndex, pageSize, ['GraphicsProcessorChipsets']);
    const deleteAction = await deleteComponentAction(endpoint, ['GraphicsProcessorChipsets'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new chipset
                </CreateButton>
            </Controls>
            <Table columns={GraphicsProcessorChipsetColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}