import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {DeletePCIeBracket} from '@/server/catalogue/pcie/pcie-brackets';
import {PCIeSlotColumns} from '@/server/models';
import {ListPCIeSlots} from "@/server/catalogue/pcie/pcie-slots";


export default async function Page() {
    const rows = await ListPCIeSlots(1, 20);
    return (
        <Body>
            <Controls>
                <CreateButton>
                    Specify new slot
                </CreateButton>
            </Controls>
            <Table columns={PCIeSlotColumns} rows={rows} deleteAction={DeletePCIeBracket}/>
            <Pagination pageCount={13} />
        </Body>
    )
}