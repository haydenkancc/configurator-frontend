'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import {PCIeSlotDbo, PCIeSlotParams} from '@/server/models/components';
import {PCIeSizeComboBox, PCIeVersionComboBox} from '@/app/catalogue/_templates/forms';

export function Form({params, action}: PostFormProps<PCIeSlotDbo, PCIeSlotParams>) {

    const [versionID, setVersionID] = useState<number>()
    const [laneSizeID, setLaneSizeID] = useState<number>()
    const [physicalSizeID, setPhysicalSizeID] = useState<number>()


    return (
        <PostBody name="slot" submitAction={async () => await action({versionID, physicalSizeID, laneSizeID})}>
            <Module title="PCIe slot details" subtitle="Specify details for a new PCIe slot.">
                <Content>
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
        </PostBody>
    )
}