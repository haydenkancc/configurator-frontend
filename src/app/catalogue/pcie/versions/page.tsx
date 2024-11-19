import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {PCIeVersionColumns, SearchParams} from '@/server/models';
import {DeletePCIeVersion, ListPCIeVersions} from '@/server/catalogue/pcie/pcie-versions';
import {ReadPaginationData} from '@/server/catalogue';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await ListPCIeVersions(pageIndex, pageSize);
    return (
        <Body>
            <Controls>
                <CreateButton>
                    Specify new version
                </CreateButton>
            </Controls>
            <Table columns={PCIeVersionColumns} rows={paginatedList?.items} deleteAction={DeletePCIeVersion}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}