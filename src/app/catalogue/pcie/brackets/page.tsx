import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {PCIeBracketRow, PaginatedList, PCIeBracketColumns, SearchParams} from '@/server/models';
import {configuratorApiClient, ReadPaginationData} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    
    async function listPCIeBrackets(pageIndex: number, pageSize: number) {
        'use server'
        const response = await configuratorApiClient.Get<PaginatedList<PCIeBracketRow>>(`api/PCIe/PCIeBrackets?pageIndex=${pageIndex}&pageSize=${pageSize}`, ['PCIeBrackets'])
        return response.data;
    }

    async function deletePCIeBracket(id: number) {
        'use server'
        const response = await configuratorApiClient.Delete<null>(`api/PCIe/PCIeBrackets/id/${id}`);
        revalidateTag('PCIeBrackets');
    }

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await listPCIeBrackets(pageIndex, pageSize);

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Specify new bracket
                </CreateButton>
            </Controls>
            <Table columns={PCIeBracketColumns} rows={paginatedList?.items} deleteAction={deletePCIeBracket}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}