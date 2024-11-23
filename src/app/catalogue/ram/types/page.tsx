import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {MemoryTypeRow, PaginatedList, MemoryTypeColumns, SearchParams} from '@/server/models';
import {configuratorApiClient, ReadPaginationData} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {

    async function listMemoryTypes(pageIndex: number, pageSize: number) {
        'use server'
        const response = await configuratorApiClient.Get<PaginatedList<MemoryTypeRow>>(`api/Memory/MemoryTypes?pageIndex=${pageIndex}&pageSize=${pageSize}`, ['MemoryTypes'])
        return response.data;
    }

    async function deleteMemoryType(id: number) {
        'use server'
        const response = await configuratorApiClient.Delete<null>(`api/Memory/MemoryTypes/id/${id}`);
        revalidateTag('MemoryTypes');
    }

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await listMemoryTypes(pageIndex, pageSize);

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Specify new type
                </CreateButton>
            </Controls>
            <Table columns={MemoryTypeColumns} rows={paginatedList?.items} deleteAction={deleteMemoryType}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}