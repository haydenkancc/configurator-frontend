import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {M2KeyRow, PaginatedList, M2KeyColumns, SearchParams} from '@/server/models';
import {configuratorApiClient, ReadPaginationData} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';
import {deleteComponentAction, getComponents} from '@/server/catalogue/test';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    const endpoint = '/api/M2/M2Keys'

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<M2KeyRow>(endpoint, pageIndex, pageSize, ['M2Keys']);
    const deleteAction = await deleteComponentAction(endpoint, ['M2Keys'])
    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new key
                </CreateButton>
            </Controls>
            <Table columns={M2KeyColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}