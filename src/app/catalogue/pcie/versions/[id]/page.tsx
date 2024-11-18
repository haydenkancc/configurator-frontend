import {
    BackButton,
    Content,
    Controls,
    DetailsBody,
    DetailsModule, Footer,
    Row
} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import TextField from '@/components/ui/text-field';
import NumberField from '@/components/ui/number-field';
import {GetPCIeVersion, PutPCIeVersion} from '@/server/catalogue/pcie/pcie-versions';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const size = await GetPCIeVersion(id);
    return (
        <DetailsBody>
            <Controls>
                <BackButton />
            </Controls>
            <DetailsModule title="PCIe version details" subtitle="View and modify this PCIe version's details." id={id} submitAction={PutPCIeVersion}>
                <Content>
                    <Row>
                        <NumberField value={size.id} label="ID" isReadOnly />
                        <TextField label="Version" name="name" defaultValue={size.name} grow isRequired />
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