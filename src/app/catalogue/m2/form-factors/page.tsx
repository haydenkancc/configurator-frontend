import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {M2FormFactorRow, PaginatedList, M2FormFactorColumns, SearchParams} from '@/server/models';
import {configuratorApiClient, ReadPaginationData} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {

    async function listM2FormFactors(pageIndex: number, pageSize: number) {
        'use server'
        const response = await configuratorApiClient.Get<PaginatedList<M2FormFactorRow>>(`api/M2/M2FormFactors?pageIndex=${pageIndex}&pageSize=${pageSize}`, ['M2FormFactors'])
        return response.data;
    }

    async function deleteM2FormFactor(id: number) {
        'use server'
        const response = await configuratorApiClient.Delete<null>(`api/M2/M2FormFactors/id/${id}`);
        revalidateTag('M2FormFactors');
    }

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await listM2FormFactors(pageIndex, pageSize);

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Specify new form factor
                </CreateButton>
            </Controls>
            <Table columns={M2FormFactorColumns} rows={paginatedList?.items} deleteAction={deleteM2FormFactor}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}