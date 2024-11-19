import {BackLink, Content, Controls, CreateBody, CreateModule, Row} from '@/app/catalogue/_templates/view';
import TextField from '@/components/ui/text-field';
import {Button} from '@/components/ui/button';
import {PostPCIeVersion} from '@/server/catalogue/pcie/pcie-versions';

export default function Page() {
    return (
        <CreateBody submitAction={PostPCIeVersion}>
            <Controls>
                <BackLink />
                <Button variant="primary" type="submit">
                    Create version
                </Button>
            </Controls>
            <CreateModule title="PCIe version details" subtitle="Specify details for a new PCIe version.">
                <Content>
                    <Row>
                        <TextField label="Version" name="name" grow isRequired />
                    </Row>
                </Content>
            </CreateModule>
        </CreateBody>
    )
}