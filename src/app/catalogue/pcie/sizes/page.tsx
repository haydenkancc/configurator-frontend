import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {PCIeSizeRow, PaginatedList, PCIeSizeColumns, SearchParams} from '@/server/models';
import {configuratorApiClient, ReadPaginationData} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';
import {deleteComponentAction, getComponents} from '@/server/catalogue/test';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    
    const endpoint = '/api/PCIe/PCIeSizes'

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<PCIeSizeRow>(endpoint, pageIndex, pageSize, ['PCIeSizes']);
    const deleteAction = await deleteComponentAction(endpoint, ['PCIeSizes'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new size
                </CreateButton>
            </Controls>
            <Table columns={PCIeSizeColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}