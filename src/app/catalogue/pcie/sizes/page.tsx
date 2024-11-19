import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {PCIeSizeColumns, SearchParams} from '@/server/models';
import {DeletePCIeSize, ListPCIeSizes} from '@/server/catalogue/pcie/pcie-sizes';
import {ReadPaginationData} from '@/server/catalogue';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await ListPCIeSizes(pageIndex, pageSize);
    return (
        <Body>
            <Controls>
                <CreateButton>
                    Specify new size
                </CreateButton>
            </Controls>
            <Table columns={PCIeSizeColumns} rows={paginatedList?.items} deleteAction={DeletePCIeSize}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}