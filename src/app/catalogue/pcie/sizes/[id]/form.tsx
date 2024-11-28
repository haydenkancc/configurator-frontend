'use client';
import {PutFormProps} from '@/server/models'
import {PCIeSize, PCIeSizeDbo} from '@/server/models/components';
import {Content, Module, PutBody, Row} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {useState} from 'react';

export function Form({item, action}: PutFormProps<PCIeSize, PCIeSizeDbo>) {

    const [laneCount, setLaneCount] = useState<number | undefined>(item?.laneCount)

    return (
        <PutBody name="size" submitAction={async () => await action({laneCount: laneCount})}>
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