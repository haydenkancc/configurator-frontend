import {
    BackButton,
    Content,
    Controls,
    DetailsBody,
    DetailsModule, Footer,
    Row
} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import Index from '@/components/ui/text-field';
import NumberField from '@/components/ui/number-field';
import {GetPCIeBracket, PutPCIeBracket} from '@/server/catalogue/pcie/pcie-brackets';
import ComboBox from "@/components/ui/combo-box";
import SelectItem from "@/components/ui/select-item";


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const bracket = await GetPCIeBracket(id);
    return (
        <DetailsBody>
            <Controls>
                <BackButton />
            </Controls>
            <DetailsModule title="PCIe bracket slot" subtitle="View and modify this PCIe slot's details." id={id} submitAction={PutPCIeBracket}>
                <Content>
                    <Row>
                        <NumberField value={bracket.id} label="ID" isReadOnly />
                        <ComboBox grow label="Version">
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                poop
                            </SelectItem>
                            <SelectItem>
                                pee
                            </SelectItem>
                        </ComboBox>
                    </Row>
                    <Row>
                        <ComboBox grow label="Physical width">
                            <SelectItem>
                                hello
                            </SelectItem>
                        </ComboBox>
                        <ComboBox grow label="Lane width">
                            <SelectItem>
                                hello
                            </SelectItem>
                        </ComboBox>
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