import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {SearchParams} from '@/server/models'
import {SolidStateDriveNandTypeColumns, SolidStateDriveNandTypeRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/Storage/SolidStateDriveNandTypes'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<SolidStateDriveNandTypeRow>(endpoint, pageIndex, pageSize, ['SolidStateDriveNandTypes']);
    const deleteAction = await deleteComponentAction(endpoint, ['SolidStateDriveNandTypes'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new NAND type
                </CreateButton>
            </Controls>
            <Table columns={SolidStateDriveNandTypeColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}