import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {DeletePCIeBracket } from '@/server/catalogue/pcie/pcie-brackets';
import {PCIeSizeColumns} from '@/server/models';
import {DeletePCIeSize, ListPCIeSizes} from '@/server/catalogue/pcie/pcie-sizes';


export default async function Page() {
    const rows = await ListPCIeSizes(1, 20);
    return (
        <Body>
            <Controls>
                <CreateButton>
                    Specify new size
                </CreateButton>
            </Controls>
            <Table columns={PCIeSizeColumns} rows={rows} deleteAction={DeletePCIeSize}/>
            <Pagination pageCount={13} />
        </Body>
    )
}