import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {SearchParams} from '@/server/models'
import {ManufacturerColumns, ManufacturerRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/Manufacturers'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<ManufacturerRow>(endpoint, pageIndex, pageSize, ['Manufacturers']);
    const deleteAction = await deleteComponentAction(endpoint, ['Manufacturers'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new manufacturer
                </CreateButton>
            </Controls>
            <Table columns={ManufacturerColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}