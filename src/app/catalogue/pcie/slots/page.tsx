import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {PaginatedList, PCIeSlotRow, PCIeSlotColumns, SearchParams} from '@/server/models';
import {configuratorApiClient, ReadPaginationData} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {

    async function listPCIeSlots(pageIndex: number, pageSize: number) {
        'use server'
        const response = await configuratorApiClient.Get<PaginatedList<PCIeSlotRow>>(`api/PCIe/PCIeSlots?pageIndex=${pageIndex}&pageSize=${pageSize}`, ['PCIeSlots'])
        return response.data;
    }

    async function deletePCIeSlot(id: number) {
        'use server'
        const response = await configuratorApiClient.Delete<null>(`api/PCIe/PCIeSlots/id/${id}`);
        revalidateTag('PCIeSlots');
    }

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await listPCIeSlots(pageIndex, pageSize);

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Specify new slot
                </CreateButton>
            </Controls>
            <Table columns={PCIeSlotColumns} rows={paginatedList?.items} deleteAction={deletePCIeSlot}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}