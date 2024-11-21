import {BackLink, Content, Controls, FormBody, Module, Row} from '@/app/catalogue/_templates/view';
import TextField from '@/components/ui/text-field';
import {Button} from '@/components/ui/button';
import {PostPCIeBracket} from '@/server/catalogue/pcie/pcie-brackets';

export default function Page() {
    return (
        <FormBody submitAction={PostPCIeBracket}>
            <Controls>
                <BackLink />
                <Button variant="primary" type="submit">
                    Create bracket
                </Button>
            </Controls>
            <Module title="PCIe bracket details" subtitle="Specify details for a new PCIe bracket.">
                <Content>
                    <Row>
                        <TextField label="Name" name="Name" grow isRequired />
                    </Row>
                </Content>
            </Module>
        </FormBody>
    )
}