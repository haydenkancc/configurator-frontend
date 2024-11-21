import {BackLink, Content, Controls, FormBody, Module, Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import {PCIeSizeSelect, PCIeVersionSelect} from '@/app/catalogue/pcie/slots/fields';
import {GetPCIeSlotParams, PostPCIeSlot} from '@/server/catalogue/pcie/pcie-slots';

export default async function Page() {
    const slotParams = await GetPCIeSlotParams();

    return (
        <FormBody submitAction={PostPCIeSlot}>
            <Controls>
                <BackLink />
                <Button variant="primary" type="submit">
                    Create slot
                </Button>
            </Controls>
            <Module title="PCIe slot details" subtitle="Specify details for a new PCIe slot.">
                <Content>
                    <Row>
                        <PCIeVersionSelect isRequired grow label="Version" name="versionID" items={slotParams?.versions} />
                    </Row>
                    <Row>
                        <PCIeSizeSelect isRequired grow label="Physical size" name="physicalSizeID" items={slotParams?.sizes} />
                        <PCIeSizeSelect isRequired grow label="Lane size" name="laneSizeID" items={slotParams?.sizes} />
                    </Row>
                </Content>
            </Module>
        </FormBody>
    )
}