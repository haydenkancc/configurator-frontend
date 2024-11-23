import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {M2SlotColumns, M2SlotRow, PaginatedList, SearchParams} from '@/server/models';
import {configuratorApiClient, ReadPaginationData} from '@/server/catalogue';
import {revalidatePath, revalidateTag} from 'next/cache';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    async function listM2Slots(pageIndex: number, pageSize: number) {
        'use server'
        const response = await configuratorApiClient.Get<PaginatedList<M2SlotRow>>(`api/M2/M2Slots?pageIndex=${pageIndex}&pageSize=${pageSize}`, ['M2Slots'])
        return response.data;
    }

    async function deleteM2Slot(id: number) {
        'use server'
        const response = await configuratorApiClient.Delete<null>(`api/M2/M2Slots/id/${id}`);
        revalidateTag('M2Slots');
    }

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await listM2Slots(pageIndex, pageSize);

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new slot
                </CreateButton>
            </Controls>
            <Table columns={M2SlotColumns} rows={paginatedList?.items} deleteAction={deleteM2Slot}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}