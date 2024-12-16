import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {SearchParams} from '@/server/models'
import {CaseStorageFormFactorColumns, CaseStorageFormFactorRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    
    const endpoint = '/api/Storage/CaseStorageFormFactors'

    const [ pageIndex, pageSize ] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<CaseStorageFormFactorRow>(endpoint, pageIndex, pageSize, ['CaseStorageFormFactors']);
    const deleteAction = await deleteComponentAction(endpoint, ['CaseStorageFormFactors'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new form factor
                </CreateButton>
            </Controls>
            <Table columns={CaseStorageFormFactorColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}