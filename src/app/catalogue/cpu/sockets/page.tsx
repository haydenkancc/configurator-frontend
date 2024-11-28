import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {SearchParams} from '@/server/models'
import {CentralProcessorSocketColumns, CentralProcessorSocketRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/CentralProcessor/CentralProcessorSockets'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<CentralProcessorSocketRow>(endpoint, pageIndex, pageSize, ['CentralProcessorSockets']);
    const deleteAction = await deleteComponentAction(endpoint, ['CentralProcessorSockets'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new socket
                </CreateButton>
            </Controls>
            <Table columns={CentralProcessorSocketColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}