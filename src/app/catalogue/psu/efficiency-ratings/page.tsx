import {Body, Controls, CreateButton, Pagination, Table} from '@/components/catalogue/views/list-view';
import {SearchParams} from '@/server/models'
import { PowerSupply } from '@/server/models/catalogue'
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/PowerSupply/EfficiencyRatings'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<PowerSupply.EfficiencyRatingListItem>(endpoint, pageIndex, pageSize, [CatalogueTags.POWER_SUPPLY_EFFICIENCY_RATINGS]);
    const deleteAction = await deleteComponentAction(endpoint, [CatalogueTags.POWER_SUPPLY_EFFICIENCY_RATINGS])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new efficiency rating
                </CreateButton>
            </Controls>
            <Table columns={PowerSupply.EfficiencyRatingColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}