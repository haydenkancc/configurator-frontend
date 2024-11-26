import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {ManufacturerRow, PaginatedList, ManufacturerColumns, SearchParams} from '@/server/models';
import {configuratorApiClient, ReadPaginationData} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {

    async function listManufacturers(pageIndex: number, pageSize: number) {
        'use server'
        const response = await configuratorApiClient.Get<PaginatedList<ManufacturerRow>>(`api/Manufacturers?pageIndex=${pageIndex}&pageSize=${pageSize}`, ['Manufacturers'])
        return response.data;
    }

    async function deleteManufacturer(id: number) {
        'use server'
        const response = await configuratorApiClient.Delete<null>(`api/Manufacturers/id/${id}`);
        revalidateTag('Manufacturers');
    }

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await listManufacturers(pageIndex, pageSize);

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Specify new manufacturer
                </CreateButton>
            </Controls>
            <Table columns={ManufacturerColumns} rows={paginatedList?.items} deleteAction={deleteManufacturer}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}