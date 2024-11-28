'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import {PCIeSizeDbo} from '@/server/models/components';
import {NumberField} from '@/components/ui/number-field';

export function Form({action}: PostFormProps<PCIeSizeDbo>) {

    const [laneCount, setLaneCount] = useState<number>()


    return (
        <PostBody name="size" submitAction={async () => await action({laneCount})}>
            <Module title="PCIe size details" subtitle="Specify details for a new PCIe size.">
                <Content>
                    <Row>
                        <NumberField label="Lane count" value={laneCount} onChange={setLaneCount} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}