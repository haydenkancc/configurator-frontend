import {BackLink, CreateBody, Content, Controls, CreateModule, Row} from '@/app/catalogue/_templates/view';
import TextField from '@/components/ui/text-field';
import {Button} from '@/components/ui/button';
import {PostPCIeBracket} from '@/server/catalogue/pcie/pcie-brackets';
import ComboBox from "@/components/ui/combo-box";
import SelectItem from "@/components/ui/select-item";

export default function Page() {
    return (
        <CreateBody submitAction={PostPCIeBracket}>
            <Controls>
                <BackLink />
                <Button variant="primary" type="submit">
                    Save bracket
                </Button>
            </Controls>
            <CreateModule title="PCIe slot details" subtitle="Specify details for a new PCIe slot.">
                <Content>
                    <Row>
                        <ComboBox grow label="Version">
                            <SelectItem>
                                poop
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
            </CreateModule>
        </CreateBody>
    )
}