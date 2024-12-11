import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {SearchParams} from '@/server/models'
import {MotherboardUnitColumns, MotherboardUnitRow} from '@/server/models/components';
import {ReadPaginationData} from '@/server/controllers';
import {deleteComponentAction, getComponents} from '@/server/controllers/test';


export default async function Page({ searchParams } : { searchParams: SearchParams}) {
    
    const endpoint = '/api/Motherboard/MotherboardUnits'

    const [ pageIndex, pageUnit ] = await ReadPaginationData(searchParams);
    const paginatedList = await getComponents<MotherboardUnitRow>(endpoint, pageIndex, pageUnit, ['MotherboardUnits']);
    const deleteAction = await deleteComponentAction(endpoint, ['MotherboardUnits'])

    return (
        <Body>
            <Controls>
                <CreateButton>
                    Create new unit
                </CreateButton>
            </Controls>
            <Table columns={MotherboardUnitColumns} rows={paginatedList?.items} deleteAction={deleteAction}/>
            <Pagination pageCount={paginatedList?.totalPages} pageIndex={paginatedList?.pageIndex} hasNextPage={paginatedList?.hasNextPage} hasPreviousPage={paginatedList?.hasPreviousPage} />
        </Body>
    )
}