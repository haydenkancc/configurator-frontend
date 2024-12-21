'use client'
import {Content, Module, PostBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import { Pcie } from '@/server/models/catalogue';
import {PcieSizeComboBox, PcieVersionComboBox} from '../../../../../components/catalogue/views/forms';

export function Form({action, params}: PostFormProps<Pcie.SlotDbo, Pcie.SlotParams>) {

    const [versionID, setVersionID] = useState<number | null>(null);
    const [laneSizeID, setLaneSizeID] = useState<number | null>(null);
    const [physicalSizeID, setPhysicalSizeID] = useState<number | null>(null);

    return (
        <PostBody name="slot" submitAction={async () => await action({
            versionID: versionID,
            laneSizeID: laneSizeID,
            physicalSizeID: physicalSizeID,
        })}>
            <Module title="PCIe slot details" subtitle="Specify details for a new PCIe slot.">
                <Content>
                    <Row>
                        <PcieVersionComboBox grow selectedKey={versionID} onSelectionChange={setVersionID} defaultItems={params?.versions} />
                    </Row>
                    <Row>
                        <PcieSizeComboBox label="Lane size" grow selectedKey={laneSizeID} onSelectionChange={setLaneSizeID} defaultItems={params?.sizes} />
                        <PcieSizeComboBox label="Physical size" grow selectedKey={physicalSizeID} onSelectionChange={setPhysicalSizeID} defaultItems={params?.sizes} />
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}