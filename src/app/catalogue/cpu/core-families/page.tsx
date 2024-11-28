import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {SearchParams} from '@/server/models'
import {CentralProcessorCoreFamilyColumns, CentralProcessorCoreFamilyRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/CentralProcessor/CentralProcessorCoreFamilies'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<CentralProcessorCoreFamilyRow>(endpoint, pageIndex, pageSize, ['CentralProcessorCoreFamilies']);
    const deleteAction = await deleteComponentAction(endpoint, ['CentralProcessorCoreFamilies'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new core family
                </CreateButton>
            </Controls>
            <Table columns={CentralProcessorCoreFamilyColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}