import {Body, Controls, CreateButton, Pagination, Table} from '@/components/catalogue/views/list-view';
import {SearchParams} from '@/server/models'
import { PowerSupply } from '@/server/models/catalogue'
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/PowerSupply/Connectors'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<PowerSupply.ConnectorListItem>(endpoint, pageIndex, pageSize, [CatalogueTags.POWER_SUPPLY_CONNECTORS]);
    const deleteAction = await deleteComponentAction(endpoint, [CatalogueTags.POWER_SUPPLY_CONNECTORS])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new connector
                </CreateButton>
            </Controls>
            <Table columns={PowerSupply.ConnectorColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}