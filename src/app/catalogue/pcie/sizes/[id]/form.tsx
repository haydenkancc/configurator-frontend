'use client';
import {PCIeSize, PCIeSizeDbo, PutFormProps} from '@/server/models';
import {Content, Footer, Module, Row, Controls, BackLink, PutBody} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {Button} from '@/components/ui/button';
import {useState} from 'react';

export function Form({ item, action } : PutFormProps<PCIeSize, PCIeSizeDbo>) {

    const [ laneCount, setLaneCount ] = useState<number | undefined>(item?.laneCount)

    return (
        <PutBody name="size" submitAction={async () => await action({ laneCount: laneCount })}>
            <Module title="PCIe size details" subtitle="View and modify this PCIe size's details.">
                <Content>
                    <Row>
                        <NumberField value={laneCount} onChange={setLaneCount} label="Lane count" grow/>
                    </Row>
                </Content>
            </Module>
        </PutBody>
    )
}