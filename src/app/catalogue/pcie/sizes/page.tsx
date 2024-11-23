import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {PaginatedList, PCIeSizeRow, PCIeSizeColumns, SearchParams} from '@/server/models';
import {configuratorApiClient, ReadPaginationData} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    
    async function listPCIeSizes(pageIndex: number, pageSize: number) {
        'use server'
        const response = await configuratorApiClient.Get<PaginatedList<PCIeSizeRow>>(`api/PCIe/PCIeSizes?pageIndex=${pageIndex}&pageSize=${pageSize}`, ['PCIeSizes'])
        return response.data;
    }

    async function deletePCIeSize(id: number) {
        'use server'
        const response = await configuratorApiClient.Delete<null>(`api/PCIe/PCIeSizes/id/${id}`);
        revalidateTag('PCIeSizes');
    }

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await listPCIeSizes(pageIndex, pageSize);

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Specify new size
                </CreateButton>
            </Controls>
            <Table columns={PCIeSizeColumns} rows={paginatedList?.items} deleteAction={deletePCIeSize}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}