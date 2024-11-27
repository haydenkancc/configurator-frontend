'use client'
import {BackLink, PostBody, Content, Controls, Module, Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {Key} from 'react-aria-components';
import {PCIeSizeSelect, PCIeVersionSelect} from '@/app/catalogue/pcie/slots/fields';
import {PCIeSlotDbo, PCIeSlotParams, PostFormProps} from '@/server/models';

export function Form({ params, action } : PostFormProps<PCIeSlotDbo, PCIeSlotParams>) {

    const [ versionID, setVersionID ] = useState<number>()
    const [ laneSizeID, setLaneSizeID ] = useState<number>()
    const [ physicalSizeID, setPhysicalSizeID ] = useState<number>()


    return (
        <PostBody name="slot" submitAction={async () => await action({versionID, physicalSizeID, laneSizeID})}>
            <Module title="PCIe slot details" subtitle="Specify details for a new PCIe slot.">
                <Content>
                    <Row>
                        <PCIeVersionSelect grow isRequired label="Version" selectedKey={versionID} onSelectionChange={(key) => setVersionID(key as number)} items={params?.versions} />
                    </Row>
                    <Row>
                        <PCIeSizeSelect grow isRequired label="Physical size" selectedKey={physicalSizeID} onSelectionChange={(key) => setPhysicalSizeID(key as number)} items={params?.sizes} />
                        <PCIeSizeSelect grow isRequired label="Lane size" selectedKey={laneSizeID} onSelectionChange={(key) => setLaneSizeID(key as number)} items={params?.sizes} />
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}