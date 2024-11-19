import {BackLink, Content, Controls, CreateBody, CreateModule, Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import {PostPCIeSize} from '@/server/catalogue/pcie/pcie-sizes';
import NumberField from '@/components/ui/number-field';
import TextField from '@/components/ui/text-field';

export default function Page() {
    return (
        <CreateBody submitAction={PostPCIeSize}>
            <Controls>
                <BackLink />
                <Button variant="primary" type="submit">
                    Create key
                </Button>
            </Controls>
            <CreateModule title="M.2 key details" subtitle="Specify details for a new M.2 key.">
                <Content>
                    <Row>
                        <TextField label="Name" name="name" grow isRequired />
                    </Row>
                </Content>
            </CreateModule>
            <CreateModule title="Compatible M.2 keys" subtitle="Specify which keys are compatible with this key.">
                <Content>
                    <Row>
                        poop
                    </Row>
                </Content>
            </CreateModule>
        </CreateBody>
    )
}