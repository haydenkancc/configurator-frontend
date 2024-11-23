'use client';
import {PCIeSlot, PCIeSlotParams} from '@/server/models';
import {Content, Footer, FormModule, Row} from '@/app/catalogue/_templates/view';
import NumberField from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import {PCIeSizeSelect, PCIeVersionSelect} from '@/app/catalogue/pcie/slots/fields';
import {Key} from 'react-aria-components';


interface DetailsProps {
    slotParams?: PCIeSlotParams
    slot: PCIeSlot;
    action: (physicalSizeID?: Key, laneSizeID?: Key, versionID?: Key) => Promise<void>
}

export function Details({ slotParams, slot, action } : DetailsProps) {

    const [ physicalSizeID, setPhysicalSizeID ] = useState<Key>()
    const [ laneSizeID, setLaneSizeID ] = useState<Key>()
    const [ versionID, setVersionID ] = useState<Key>()

    return (
        <FormModule title="PCIe slot details" subtitle="View and modify this PCIe slot's details." action={async () => action(physicalSizeID, laneSizeID, versionID)}>
            <Content>
                <Row>
                    <NumberField value={slot.id} label="ID" isReadOnly />
                    <PCIeVersionSelect isRequired grow label="Version" name="versionID" items={slotParams?.versions} onSelectionChange={(k) => {setVersionID(k); console.log(k)}} defaultSelectedKey={slot.version.id} />
                </Row>
                <Row>
                    <PCIeSizeSelect isRequired grow label="Physical size" name="physicalSizeID" items={slotParams?.sizes} onSelectionChange={setPhysicalSizeID} defaultSelectedKey={slot.physicalSize.id} />
                    <PCIeSizeSelect isRequired grow label="Lane size" name="laneSizeID" items={slotParams?.sizes} onSelectionChange={setLaneSizeID} defaultSelectedKey={slot.laneSize.id} />
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
        </FormModule>
    )
}

