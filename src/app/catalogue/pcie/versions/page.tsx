import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {PCIeVersionRow, PaginatedList, PCIeVersionColumns, SearchParams} from '@/server/models';
import {configuratorApiClient, ReadPaginationData} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';
import {deleteComponentAction, getComponents} from '@/server/catalogue/test';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    
    const endpoint = '/api/PCIe/PCIeVersions'

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<PCIeVersionRow>(endpoint, pageIndex, pageSize, ['PCIeVersions']);
    const deleteAction = await deleteComponentAction(endpoint, ['PCIeVersions'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new version
                </CreateButton>
            </Controls>
            <Table columns={PCIeVersionColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}