import {Body, Controls, CreateButton, Pagination, Table} from '@/components/catalogue/views/list-view';
import {SearchParams} from '@/server/models'
import { Pcie } from '@/server/models/catalogue'
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/Pcie/Sizes'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<Pcie.SizeListItem>(endpoint, pageIndex, pageSize, [CatalogueTags.PCIE_SIZES]);
    const deleteAction = await deleteComponentAction(endpoint, [CatalogueTags.PCIE_SIZES])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new size
                </CreateButton>
            </Controls>
            <Table columns={Pcie.SizeColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}