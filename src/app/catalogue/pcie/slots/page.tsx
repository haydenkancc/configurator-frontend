import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {PCIeSlotRow, PaginatedList, PCIeSlotColumns, SearchParams} from '@/server/models';
import {configuratorApiClient, ReadPaginationData} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';
import {deleteComponentAction, getComponents} from '@/server/catalogue/test';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    const endpoint = '/api/PCIe/PCIeSlots'

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<PCIeSlotRow>(endpoint, pageIndex, pageSize, ['PCIeSlots']);
    const deleteAction = await deleteComponentAction(endpoint, ['PCIeSlots'])
    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new slot
                </CreateButton>
            </Controls>
            <Table columns={PCIeSlotColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}