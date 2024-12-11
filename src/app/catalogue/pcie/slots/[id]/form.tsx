'use client';
import {PutFormProps} from '@/server/models';
import {PCIeSlot, PCIeSlotDbo, PCIeSlotParams} from '@/server/models/components'
import {Content, Module, PutBody, Row} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {useState} from 'react';
import {PCIeSizeComboBox, PCIeVersionComboBox} from '@/app/catalogue/_templates/forms';

export function Form({item, action, params}: PutFormProps<PCIeSlot, PCIeSlotDbo, PCIeSlotParams>) {

    const [versionID, setVersionID] = useState(item?.version.id)
    const [laneSizeID, setLaneSizeID] = useState(item?.laneSize.laneCount)
    const [physicalSizeID, setPhysicalSizeID] = useState(item?.physicalSize.laneCount)

    return (
        <PutBody name="slot" submitAction={async () => await action({versionID, laneSizeID, physicalSizeID})}>
            <Module title="PCIe slot details" subtitle="View and modify this PCIe slot's details.">
                <Content>
                    <Row>
                        <NumberField grow value={item?.id} label="ID" isReadOnly/>
                    </Row>
                    <Row>
                        <PCIeVersionComboBox grow isRequired label="Version" selectedKey={versionID}
                                             onSelectionChange={(key) => setVersionID(key as number)}
                                             defaultItems={params?.versions}/>
                    </Row>
                    <Row>
                        <PCIeSizeComboBox grow isRequired label="Physical size" selectedKey={physicalSizeID}
                                          onSelectionChange={(key) => setPhysicalSizeID(key as number)}
                                          defaultItems={params?.sizes}/>
                        <PCIeSizeComboBox grow isRequired label="Lane size" selectedKey={laneSizeID}
                                          onSelectionChange={(key) => setLaneSizeID(key as number)}
                                          defaultItems={params?.sizes}/>
                    </Row>
                </Content>
            </Module>
        </PutBody>
    )
}