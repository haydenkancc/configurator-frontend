import s from './page.module.scss';
import {BackLink, CreateBody, Content, Controls, CreateModule, Row} from '@/app/catalogue/_templates/view';
import TextField from '@/components/ui/text-field';
import {Button} from '@/components/ui/button';
import {PostPCIeSize} from '@/server/catalogue/pcie/pcie-sizes';
import NumberField from '@/components/ui/number-field';

export default function Page() {
    return (
        <CreateBody submitAction={PostPCIeSize}>
            <Controls>
                <BackLink />
                <Button variant="primary" type="submit">
                    Save size
                </Button>
            </Controls>
            <CreateModule title="PCIe size details" subtitle="Specify details for a new PCIe size.">
                <Content>
                    <Row>
                        <NumberField label="Lane count" name="laneCount" grow isRequired />
                    </Row>
                </Content>
            </CreateModule>
        </CreateBody>
    )
}