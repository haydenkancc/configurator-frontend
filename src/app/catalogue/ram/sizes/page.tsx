import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {PaginatedList, MemorySizeRow, MemorySizeColumns, SearchParams} from '@/server/models';
import {configuratorApiClient, ReadPaginationData} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    
    async function listMemorySizes(pageIndex: number, pageSize: number) {
        'use server'
        const response = await configuratorApiClient.Get<PaginatedList<MemorySizeRow>>(`api/Memory/MemorySizes?pageIndex=${pageIndex}&pageSize=${pageSize}`, ['MemorySizes'])
        return response.data;
    }

    async function deleteMemorySize(id: number) {
        'use server'
        const response = await configuratorApiClient.Delete<null>(`api/Memory/MemorySizes/id/${id}`);
        revalidateTag('MemorySizes');
    }

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await listMemorySizes(pageIndex, pageSize);

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Specify new size
                </CreateButton>
            </Controls>
            <Table columns={MemorySizeColumns} rows={paginatedList?.items} deleteAction={deleteMemorySize}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}