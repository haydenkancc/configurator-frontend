import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {MemoryFormFactorRow, PaginatedList, MemoryFormFactorColumns, SearchParams} from '@/server/models';
import {configuratorApiClient, ReadPaginationData} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {

    async function listMemoryFormFactors(pageIndex: number, pageSize: number) {
        'use server'
        const response = await configuratorApiClient.Get<PaginatedList<MemoryFormFactorRow>>(`api/Memory/MemoryFormFactors?pageIndex=${pageIndex}&pageSize=${pageSize}`, ['MemoryFormFactors'])
        return response.data;
    }

    async function deleteMemoryFormFactor(id: number) {
        'use server'
        const response = await configuratorApiClient.Delete<null>(`api/Memory/MemoryFormFactors/id/${id}`);
        revalidateTag('MemoryFormFactors');
    }

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await listMemoryFormFactors(pageIndex, pageSize);

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Specify new form factor
                </CreateButton>
            </Controls>
            <Table columns={MemoryFormFactorColumns} rows={paginatedList?.items} deleteAction={deleteMemoryFormFactor}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}