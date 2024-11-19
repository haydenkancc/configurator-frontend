import {BackLink, Content, Controls, DetailsBody, DetailsModule, Footer, Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import NumberField from '@/components/ui/number-field';
import {GetPCIeSize, PutPCIeSize} from '@/server/catalogue/pcie/pcie-sizes';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const size = await GetPCIeSize(id);
    return (
        <DetailsBody>
            <Controls>
                <BackLink />
            </Controls>
            <DetailsModule title="PCIe size details" subtitle="View and modify this PCIe size's details." id={id} submitAction={PutPCIeSize}>
                <Content>
                    <Row>
                        <NumberField value={size.id} label="ID" isReadOnly />
                        <NumberField label="Lane count" name="laneCount" defaultValue={size.laneCount} grow isRequired />
                    </Row>
                </Content>
                <Footer>
                    <Button type="reset" variant="neutral">
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Save changes
                    </Button>
                </Footer>
            </DetailsModule>

        </DetailsBody>
    )
}