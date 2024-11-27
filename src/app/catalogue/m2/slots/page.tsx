import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {M2SlotRow, PaginatedList, M2SlotColumns, SearchParams} from '@/server/models';
import {configuratorApiClient, ReadPaginationData} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';
import {deleteComponentAction, getComponents} from '@/server/catalogue/test';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    const endpoint = '/api/M2/M2Slots'

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<M2SlotRow>(endpoint, pageIndex, pageSize, ['M2Slots']);
    const deleteAction = await deleteComponentAction(endpoint, ['M2Slots'])
    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new slot
                </CreateButton>
            </Controls>
            <Table columns={M2SlotColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}