'use client'
import {BackLink, Content, Controls, FormBody, Module, Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PCIeSizeSelect, PCIeVersionSelect} from '@/app/catalogue/pcie/slots/fields';
import {PCIeSlotParams} from '@/server/models';
import {Key} from 'react-aria-components';

interface FormParams {
    slotParams?: PCIeSlotParams;
    action: (physicalSizeID?: Key, laneSizeID?: Key, versionID?: Key) => Promise<void>
}

export function Form({ slotParams, action } : FormParams) {

    const [ physicalSizeID, setPhysicalSizeID ] = useState<Key>()
    const [ laneSizeID, setLaneSizeID ] = useState<Key>()
    const [ versionID, setVersionID ] = useState<Key>()

    return (
        <FormBody action={async () => await action(physicalSizeID, laneSizeID, versionID)}>
            <Controls>
                <BackLink />
                <Button variant="primary" type="submit">
                    Create slot
                </Button>
            </Controls>
            <Module title="PCIe slot details" subtitle="Specify details for a new PCIe slot.">
                <Content>
                    <Row>
                        <PCIeVersionSelect isRequired grow label="Version" name="versionID" onSelectionChange={setVersionID} items={slotParams?.versions} />
                    </Row>
                    <Row>
                        <PCIeSizeSelect isRequired grow label="Physical size" name="physicalSizeID" onSelectionChange={setPhysicalSizeID} items={slotParams?.sizes} />
                        <PCIeSizeSelect isRequired grow label="Lane size" name="laneSizeID" onSelectionChange={setLaneSizeID} items={slotParams?.sizes} />
                    </Row>
                </Content>
            </Module>
        </FormBody>
    )
}