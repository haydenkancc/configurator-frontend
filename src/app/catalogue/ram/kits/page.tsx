import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {MemoryKitRow, PaginatedList, MemoryKitColumns, SearchParams} from '@/server/models';
import {configuratorApiClient, ReadPaginationData} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {

    async function listMemoryKits(pageIndex: number, pageSize: number) {
        'use server'
        const response = await configuratorApiClient.Get<PaginatedList<MemoryKitRow>>(`api/Memory/MemoryKits?pageIndex=${pageIndex}&pageSize=${pageSize}`, ['MemoryKits'])
        return response.data;
    }

    async function deleteMemoryKit(id: number) {
        'use server'
        const response = await configuratorApiClient.Delete<null>(`api/Memory/MemoryKits/id/${id}`);
        revalidateTag('MemoryKits');
    }

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await listMemoryKits(pageIndex, pageSize);

    console.log(paginatedList);

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Specify new kit
                </CreateButton>
            </Controls>
            <Table columns={MemoryKitColumns} rows={paginatedList?.items} deleteAction={deleteMemoryKit}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}