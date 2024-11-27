'use client';
import {PCIeSlot, PCIeSlotDbo, PCIeSlotParams, PutFormProps} from '@/server/models';
import {Content, Footer, Module, Row, PutBody, Controls, BackLink} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {Button} from '@/components/ui/button';
import {useContext, useState} from 'react';
import {PCIeSizeSelect, PCIeVersionSelect} from '@/app/catalogue/pcie/slots/fields';
import {ToastQueueContext} from '@/app/providers';




export function Form({ item, action, params } : PutFormProps<PCIeSlot, PCIeSlotDbo, PCIeSlotParams>) {

    const [ versionID, setVersionID ] = useState(item?.version.id)
    const [ laneSizeID, setLaneSizeID ] = useState(item?.laneSize.laneCount)
    const [ physicalSizeID, setPhysicalSizeID ] = useState(item?.physicalSize.laneCount)

    return (
        <PutBody name="slot" submitAction={async () => await action({versionID, laneSizeID, physicalSizeID})}>
            <Module title="PCIe slot details" subtitle="View and modify this PCIe slot's details.">
                <Content>
                    <Row>
                        <NumberField grow value={item?.id} label="ID" isReadOnly />
                    </Row>
                    <Row>
                        <PCIeVersionSelect grow isRequired label="Version" selectedKey={versionID} onSelectionChange={(key) => setVersionID(key as number)} items={params?.versions} />
                    </Row>
                    <Row>
                        <PCIeSizeSelect grow isRequired label="Physical size" selectedKey={physicalSizeID} onSelectionChange={(key) => setPhysicalSizeID(key as number)} items={params?.sizes} />
                        <PCIeSizeSelect grow isRequired label="Lane size" selectedKey={laneSizeID} onSelectionChange={(key) => setLaneSizeID(key as number)} items={params?.sizes} />
                    </Row>
                </Content>
            </Module>
        </PutBody>
    )
}