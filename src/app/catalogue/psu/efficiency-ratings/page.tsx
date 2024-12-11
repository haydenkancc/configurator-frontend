import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {SearchParams} from '@/server/models'
import {PowerSupplyEfficiencyRatingColumns, PowerSupplyEfficiencyRatingRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    
    const endpoint = '/api/PowerSupply/PowerSupplyEfficiencyRatings'

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<PowerSupplyEfficiencyRatingRow>(endpoint, pageIndex, pageSize, ['PowerSupplyEfficiencyRatings']);
    const deleteAction = await deleteComponentAction(endpoint, ['PowerSupplyEfficiencyRatings'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new efficiency rating
                </CreateButton>
            </Controls>
            <Table columns={PowerSupplyEfficiencyRatingColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}