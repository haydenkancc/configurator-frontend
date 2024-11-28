import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {SearchParams} from '@/server/models';
import {IOConnectorColumns, IOConnectorRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    const endpoint = '/api/IO/IOConnectors'

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<IOConnectorRow>(endpoint, pageIndex, pageSize, ['IOConnectors']);
    const deleteAction = await deleteComponentAction(endpoint, ['IOConnectors'])
    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new connector
                </CreateButton>
            </Controls>
            <Table columns={IOConnectorColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}