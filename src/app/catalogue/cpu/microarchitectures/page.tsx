import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {SearchParams} from '@/server/models'
import {CentralProcessorMicroarchitectureColumns, CentralProcessorMicroarchitectureRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/CentralProcessor/CentralProcessorMicroarchitectures'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<CentralProcessorMicroarchitectureRow>(endpoint, pageIndex, pageSize, ['CentralProcessorMicroarchitectures']);
    const deleteAction = await deleteComponentAction(endpoint, ['CentralProcessorMicroarchitectures'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new microarchitecture
                </CreateButton>
            </Controls>
            <Table columns={CentralProcessorMicroarchitectureColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}