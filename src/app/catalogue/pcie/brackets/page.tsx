import {Body, Controls, CreateButton, Pagination, Table} from '@/app/catalogue/_templates/home';
import {DeletePCIeBracket, ListPCIeBrackets} from '@/server/catalogue/pcie/pcie-brackets';
import {PCIeBracketColumns} from '@/server/models';


export default async function Page() {
    const rows = await ListPCIeBrackets(1, 20);
    return (
        <Body>
            <Controls>
                <CreateButton>
                    Specify new bracket
                </CreateButton>
            </Controls>
            <Table columns={PCIeBracketColumns} rows={rows} deleteAction={DeletePCIeBracket}/>
            <Pagination pageCount={13} />
        </Body>
    )
}