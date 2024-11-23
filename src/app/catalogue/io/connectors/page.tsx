import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {IOConnectorColumns, IOConnectorRow, PaginatedList, SearchParams} from '@/server/models';
import {configuratorApiClient, ReadPaginationData} from '@/server/catalogue';
import {revalidatePath, revalidateTag} from 'next/cache';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    async function listIOConnectors(pageIndex: number, pageSize: number) {
        'use server'
        const response = await configuratorApiClient.Get<PaginatedList<IOConnectorRow>>(`api/IO/IOConnectors?pageIndex=${pageIndex}&pageSize=${pageSize}`, ['IOConnectors'])
        return response.data;
    }

    async function deleteIOConnector(id: number) {
        'use server'
        const response = await configuratorApiClient.Delete<null>(`api/IO/IOConnectors/id/${id}`);
        revalidateTag('IOConnectors');
    }

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await listIOConnectors(pageIndex, pageSize);

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Specify new connector
                </CreateButton>
            </Controls>
            <Table columns={IOConnectorColumns} rows={paginatedList?.items} deleteAction={deleteIOConnector}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}