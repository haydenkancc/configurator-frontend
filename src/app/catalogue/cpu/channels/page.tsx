import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {SearchParams} from '@/server/models'
import {CentralProcessorChannelColumns, CentralProcessorChannelRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/CentralProcessor/CentralProcessorChannels'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<CentralProcessorChannelRow>(endpoint, pageIndex, pageSize, ['CentralProcessorChannels']);
    const deleteAction = await deleteComponentAction(endpoint, ['CentralProcessorChannels'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new channel
                </CreateButton>
            </Controls>
            <Table columns={CentralProcessorChannelColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}