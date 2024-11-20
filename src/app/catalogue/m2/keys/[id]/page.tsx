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
import {GetM2Key, GetM2KeyParams, PutM2Key} from '@/server/catalogue/m2/m2-keys';
import TextField from '@/components/ui/text-field';
import {TreeBuilder} from '@/components/ui/tree-builder';
import {ListBuilder, ListBuilderItem} from '@/components/ui/list-builder';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const key = await GetM2Key(id);
    const keyParams = await GetM2KeyParams();
    console.log(keyParams);
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
                        <ListBuilder>
                            <ListBuilderItem>
                                goodbye
                            </ListBuilderItem>
                            <ListBuilderItem>
                                hello
                            </ListBuilderItem>
                            <ListBuilderItem>
                                123
                            </ListBuilderItem>
                        </ListBuilder>
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