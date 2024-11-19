import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {DeletePCIeBracket, ListPCIeBrackets} from '@/server/catalogue/pcie/pcie-brackets';
import {PCIeBracketColumns, SearchParams} from '@/server/models';
import {ReadPaginationData} from '@/server/catalogue';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await ListPCIeBrackets(pageIndex, pageSize);
    return (
        <Body>
            <Controls>
                <CreateButton>
                    Specify new bracket
                </CreateButton>
            </Controls>
            <Table columns={PCIeBracketColumns} rows={paginatedList?.items} deleteAction={DeletePCIeBracket}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}