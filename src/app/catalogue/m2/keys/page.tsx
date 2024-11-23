import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {M2KeyColumns, M2KeyRow, PaginatedList, PCIeSizeColumns, SearchParams} from '@/server/models';
import {configuratorApiClient, ReadPaginationData} from '@/server/catalogue';
import {revalidatePath, revalidateTag} from 'next/cache';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    async function listM2Keys(pageIndex: number, pageSize: number) {
        'use server'
        const response = await configuratorApiClient.Get<PaginatedList<M2KeyRow>>(`api/M2/M2Keys?pageIndex=${pageIndex}&pageSize=${pageSize}`, ['M2Keys'])
        return response.data;
    }

    async function deleteM2Key(id: number) {
        'use server'
        const response = await configuratorApiClient.Delete<null>(`api/M2/M2Keys/id/${id}`);
        revalidateTag('M2Keys');
    }

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await listM2Keys(pageIndex, pageSize);

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Specify new key
                </CreateButton>
            </Controls>
            <Table columns={M2KeyColumns} rows={paginatedList?.items} deleteAction={deleteM2Key}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}