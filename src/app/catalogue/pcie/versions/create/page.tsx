import {BackLink, Content, Controls, FormBody, Module, Row} from '@/app/catalogue/_templates/view';
import TextField from '@/components/ui/text-field';
import {Button} from '@/components/ui/button';
import {PostPCIeVersion} from '@/server/catalogue/pcie/pcie-versions';

export default function Page() {
    return (
        <FormBody submitAction={PostPCIeVersion}>
            <Controls>
                <BackLink />
                <Button variant="primary" type="submit">
                    Create version
                </Button>
            </Controls>
            <Module title="PCIe version details" subtitle="Specify details for a new PCIe version.">
                <Content>
                    <Row>
                        <TextField label="Version" name="name" grow isRequired />
                    </Row>
                </Content>
            </Module>
        </FormBody>
    )
}