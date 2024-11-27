import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {M2FormFactorRow, PaginatedList, M2FormFactorColumns, SearchParams} from '@/server/models';
import {configuratorApiClient, ReadPaginationData} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';
import {deleteComponentAction, getComponents} from '@/server/catalogue/test';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    
    const endpoint = '/api/M2/M2FormFactors'

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<M2FormFactorRow>(endpoint, pageIndex, pageSize, ['M2FormFactors']);
    const deleteAction = await deleteComponentAction(endpoint, ['M2FormFactors'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new form factor
                </CreateButton>
            </Controls>
            <Table columns={M2FormFactorColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}