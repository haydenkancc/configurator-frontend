import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {M2KeyColumns, PCIeSizeColumns, SearchParams} from '@/server/models';
import {DeletePCIeSize, ListPCIeSizes} from '@/server/catalogue/pcie/pcie-sizes';
import {ReadPaginationData} from '@/server/catalogue';
import {DeleteM2Key, ListM2Keys} from '@/server/catalogue/m2/m2-keys';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await ListM2Keys(pageIndex, pageSize);
    return (
        <Body>
            <Controls>
                <CreateButton>
                    Specify new key
                </CreateButton>
            </Controls>
            <Table columns={M2KeyColumns} rows={paginatedList?.items} deleteAction={DeleteM2Key}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}