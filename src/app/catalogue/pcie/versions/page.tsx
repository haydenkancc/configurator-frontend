import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {PCIeVersionColumns} from '@/server/models';
import {ListPCIeSizes} from '@/server/catalogue/pcie/pcie-sizes';
import {DeletePCIeVersion, ListPCIeVersions} from '@/server/catalogue/pcie/pcie-versions';


export default async function Page() {
    const rows = await ListPCIeVersions(1, 20);
    return (
        <Body>
            <Controls>
                <CreateButton>
                    Specify new version
                </CreateButton>
            </Controls>
            <Table columns={PCIeVersionColumns} rows={rows} deleteAction={DeletePCIeVersion}/>
            <Pagination pageCount={13} />
        </Body>
    )
}