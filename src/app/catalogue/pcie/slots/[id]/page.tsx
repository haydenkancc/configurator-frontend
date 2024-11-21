import {BackLink, Content, Controls, Body, FormModule, Footer, Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import NumberField from '@/components/ui/number-field';
import {GetPCIeSlot, GetPCIeSlotParams, PutPCIeSlot} from '@/server/catalogue/pcie/pcie-slots';
import {PCIeSizeSelect, PCIeVersionSelect} from '@/app/catalogue/pcie/slots/fields';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const slot = await GetPCIeSlot(id);
    const slotParams = await GetPCIeSlotParams();
    return (
        <Body>
            <Controls>
                <BackLink />
            </Controls>
            <FormModule title="PCIe bracket slot" subtitle="View and modify this PCIe slot's details." id={id} submitAction={PutPCIeSlot}>
                <Content>
                    <Row>
                        <NumberField value={slot.id} label="ID" isReadOnly />
                        <PCIeVersionSelect isRequired grow label="Version" name="versionID" items={slotParams?.versions} defaultSelectedKey={slot.version.id} />
                    </Row>
                    <Row>
                        <PCIeSizeSelect isRequired grow label="Physical size" name="physicalSizeID" items={slotParams?.sizes} defaultSelectedKey={slot.physicalSize.id} />
                        <PCIeSizeSelect isRequired grow label="Lane size" name="laneSizeID" items={slotParams?.sizes} defaultSelectedKey={slot.laneSize.id} />
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
            </FormModule>

        </Body>
    )
}