import {
    BackLink,
    Content,
    Controls,
    CreateModule,
    DetailsBody,
    DetailsModule,
    Footer,
    Row
} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import NumberField from '@/components/ui/number-field';
import {GetM2Key, PutM2Key} from '@/server/catalogue/m2/m2-keys';
import TextField from '@/components/ui/text-field';
import {M2KeysListBuilder} from '@/app/catalogue/m2/keys/fields';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const key = await GetM2Key(id);
    console.log(key);
    return (
        <DetailsBody>
            <Controls>
                <BackLink />
            </Controls>
            <DetailsModule title="PCIe size details" subtitle="View and modify this PCIe size's details." id={id} submitAction={PutM2Key}>
                <Content>
                    <Row>
                        <NumberField value={key.id} label="ID" isReadOnly />
                        <TextField label="Name" name="name" defaultValue={key.name} grow isRequired />
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
            <DetailsModule title="Compatible M.2 keys" subtitle="Specify which keys are compatible with this key." id={id} submitAction={PutM2Key}>
                <Content>
                        <M2KeysListBuilder></M2KeysListBuilder>
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