import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {SearchParams} from '@/server/models'
import {FanSizeColumns, FanSizeRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    
    const endpoint = '/api/Fan/FanSizes'

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<FanSizeRow>(endpoint, pageIndex, pageSize, ['FanSizes']);
    const deleteAction = await deleteComponentAction(endpoint, ['FanSizes'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new size
                </CreateButton>
            </Controls>
            <Table columns={FanSizeColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}