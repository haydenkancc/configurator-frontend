import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {SearchParams} from '@/server/models'
import {PowerSupplyModularityColumns, PowerSupplyModularityRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    
    const endpoint = '/api/PowerSupply/PowerSupplyModularities'

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<PowerSupplyModularityRow>(endpoint, pageIndex, pageSize, ['PowerSupplyModularities']);
    const deleteAction = await deleteComponentAction(endpoint, ['PowerSupplyModularities'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new modularity
                </CreateButton>
            </Controls>
            <Table columns={PowerSupplyModularityColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}