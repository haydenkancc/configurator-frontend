import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {PCIeSlotColumns, SearchParams} from '@/server/models';
import {DeletePCIeSlot, ListPCIeSlots} from "@/server/catalogue/pcie/pcie-slots";
import {ReadPaginationData} from '@/server/catalogue';

export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await ListPCIeSlots(pageIndex, pageSize);
    return (
        <Body>
            <Controls>
                <CreateButton>
                    Specify new slot
                </CreateButton>
            </Controls>
            <Table columns={PCIeSlotColumns} rows={paginatedList?.items} deleteAction={DeletePCIeSlot}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}