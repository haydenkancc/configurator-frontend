import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {SearchParams} from '@/server/models'
import { Pcie } from '@/server/models/catalogue'
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/Pcie/Brackets'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<Pcie.BracketListItem>(endpoint, pageIndex, pageSize, ['PcieBrackets']);
    const deleteAction = await deleteComponentAction(endpoint, ['PcieBrackets'])

    console.log(paginatedList);

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new bracket
                </CreateButton>
            </Controls>
            <Table columns={Pcie.BracketColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}