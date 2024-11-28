import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {SearchParams} from '@/server/models'
import {PCIeBracketColumns, PCIeBracketRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/PCIe/PCIeBrackets'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<PCIeBracketRow>(endpoint, pageIndex, pageSize, ['PCIeBrackets']);
    const deleteAction = await deleteComponentAction(endpoint, ['PCIeBrackets'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new bracket
                </CreateButton>
            </Controls>
            <Table columns={PCIeBracketColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}