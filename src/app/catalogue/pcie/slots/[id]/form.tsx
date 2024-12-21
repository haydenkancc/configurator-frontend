'use client';
import {PutFormProps} from '@/server/models'
import { Pcie } from '@/server/models/catalogue';
import {Content, Module, PutBody, Row} from '@/components/catalogue/views/item-view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PcieSizeComboBox, PcieVersionComboBox} from '../../../../../components/catalogue/views/forms';

export function Form({item, action, params}: PutFormProps<Pcie.SlotDto, Pcie.SlotDbo, Pcie.SlotParams>) {

    const [versionID, setVersionID] = useState<number | null>(item?.version.id ?? null);
    const [laneSizeID, setLaneSizeID] = useState<number | null>(item?.laneSize.id ?? null);
    const [physicalSizeID, setPhysicalSizeID] = useState<number | null>(item?.physicalSize.id ?? null);

    return (
        <PutBody name="slot" submitAction={async () => await action({
            versionID: versionID,
            laneSizeID: laneSizeID,
            physicalSizeID: physicalSizeID,
        })}>
            <Module title="PCIe slot details" subtitle="Specify details for a new PCIe slot.">
                <Content>
                    <Row>
                        <PcieVersionComboBox grow selectedKey={versionID} onSelectionChange={setVersionID} defaultItems={params?.versions}/>
                    </Row>
                    <Row>
                        <PcieSizeComboBox label="Lane size" grow selectedKey={laneSizeID} onSelectionChange={setLaneSizeID} defaultItems={params?.sizes} />
                        <PcieSizeComboBox label="Physical size" grow selectedKey={physicalSizeID} onSelectionChange={setPhysicalSizeID} defaultItems={params?.sizes} />
                    </Row>
                </Content>
            </Module>
        </PutBody>
    )
}