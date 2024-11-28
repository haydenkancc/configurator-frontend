import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {SearchParams} from '@/server/models'
import {CentralProcessorSeriesColumns, CentralProcessorSeriesRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/CentralProcessor/CentralProcessorSeries'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<CentralProcessorSeriesRow>(endpoint, pageIndex, pageSize, ['CentralProcessorSeries']);
    const deleteAction = await deleteComponentAction(endpoint, ['CentralProcessorSeries'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new series
                </CreateButton>
            </Controls>
            <Table columns={CentralProcessorSeriesColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}