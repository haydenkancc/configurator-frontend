import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home'
import {SearchParams} from '@/server/models';
import {FanPackColumns, FanPackRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/Fan/FanPacks'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<FanPackRow>(endpoint, pageIndex, pageSize, ['FanPacks', 'Manufacturers']);
    const deleteAction = await deleteComponentAction(endpoint, ['FanPacks'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new pack
                </CreateButton>
            </Controls>
            <Table columns={FanPackColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination
                pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}
            />
        </Body>
    )
}