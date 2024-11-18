import s from './page.module.scss';
import {BackLink, CreateBody, Content, Controls, CreateModule, Row} from '@/app/catalogue/_templates/view';
import TextField from '@/components/ui/text-field';
import {ArrowLeft} from '@phosphor-icons/react/dist/ssr';
import {Button} from '@/components/ui/button';
import {PostPCIeBracket} from '@/server/catalogue/pcie/pcie-brackets';

export default function Page() {
    return (
        <CreateBody submitAction={PostPCIeBracket}>
            <Controls>
                <BackLink />
                <Button variant="primary" type="submit">
                    Save bracket
                </Button>
            </Controls>
            <CreateModule title="PCIe bracket details" subtitle="Specify details for a new PCIe bracket.">
                <Content>
                    <Row>
                        <TextField label="Name" name="Name" grow isRequired />
                    </Row>
                </Content>
            </CreateModule>
        </CreateBody>
    )
}