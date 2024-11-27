'use client'
import {BackLink, Content, Controls, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PCIeSizeDbo, PostFormProps} from '@/server/models';
import {NumberField} from '@/components/ui/number-field';

export function Form({ action } : PostFormProps<PCIeSizeDbo>) {

    const [ laneCount, setLaneCount ] = useState<number>()


    return (
        <PostBody name="size" submitAction={async () => await action({laneCount})}>
            <Module title="PCIe size details" subtitle="Specify details for a new PCIe size.">
                <Content>
                    <Row>
                        <NumberField label="Lane count" value={laneCount} onChange={setLaneCount} grow isRequired />
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}