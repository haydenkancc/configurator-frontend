import {Body, Controls, CreateButton, Pagination, Table} from '@/components/catalogue/views/list-view';
import {SearchParams} from '@/server/models'
import { PowerSupply } from '@/server/models/catalogue'
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/PowerSupply/Units'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<PowerSupply.UnitListItem>(endpoint, pageIndex, pageSize, [CatalogueTags.POWER_SUPPLY_UNITS]);
    const deleteAction = await deleteComponentAction(endpoint, [CatalogueTags.POWER_SUPPLY_UNITS])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new unit
                </CreateButton>
            </Controls>
            <Table columns={PowerSupply.UnitColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}