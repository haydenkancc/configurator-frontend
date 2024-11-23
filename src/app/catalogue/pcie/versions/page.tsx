import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {PaginatedList, PCIeVersionRow, PCIeVersionColumns, SearchParams} from '@/server/models';
import {configuratorApiClient, ReadPaginationData} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    
    async function listPCIeVersions(pageIndex: number, pageSize: number) {
        'use server'
        const response = await configuratorApiClient.Get<PaginatedList<PCIeVersionRow>>(`api/PCIe/PCIeVersions?pageIndex=${pageIndex}&pageSize=${pageSize}`, ['PCIeVersions'])
        return response.data;
    }

    async function deletePCIeVersion(id: number) {
        'use server'
        const response = await configuratorApiClient.Delete<null>(`api/PCIe/PCIeVersions/id/${id}`);
        revalidateTag('PCIeVersions');
    }

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await listPCIeVersions(pageIndex, pageSize);

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Specify new version
                </CreateButton>
            </Controls>
            <Table columns={PCIeVersionColumns} rows={paginatedList?.items} deleteAction={deletePCIeVersion}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}