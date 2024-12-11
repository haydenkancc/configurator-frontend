import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {SearchParams} from '@/server/models'
import {MotherboardChipsetColumns, MotherboardChipsetRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({searchParams}: { searchParams: SearchParams }) {

    const endpoint = '/api/Motherboard/MotherboardChipsets'

    const [pageIndex, pageSize] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<MotherboardChipsetRow>(endpoint, pageIndex, pageSize, ['MotherboardChipsets']);
    const deleteAction = await deleteComponentAction(endpoint, ['MotherboardChipsets'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new chipset
                </CreateButton>
            </Controls>
            <Table columns={MotherboardChipsetColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex}
                        hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage}/>
        </Body>
    )
}