import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {SearchParams} from '@/server/models';
import {PowerSupplyConnectorColumns, PowerSupplyConnectorRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    const endpoint = '/api/PowerSupply/PowerSupplyConnectors'

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<PowerSupplyConnectorRow>(endpoint, pageIndex, pageSize, ['PowerSupplyConnectors']);
    const deleteAction = await deleteComponentAction(endpoint, ['PowerSupplyConnectors'])
    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new connector
                </CreateButton>
            </Controls>
            <Table columns={PowerSupplyConnectorColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}