'use client';
import {PutFormProps} from '@/server/models'
import {MemoryCapacity, MemoryCapacityDbo} from '@/server/models/components';
import {Content, Module, PutBody, Row} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {useState} from 'react';

export function Form({item, action}: PutFormProps<MemoryCapacity, MemoryCapacityDbo>) {

    const [size, setSize] = useState<number | undefined>(item?.size)

    return (
        <PutBody name="capacity" submitAction={async () => await action({ size })}>
            <Module title="Memory capacity details" subtitle="View and modify this memory capacity's details.">
                <Content>
                    <Row>
                        <NumberField label="Size (GB)" value={size} onChange={setSize} grow/>
                    </Row>
                </Content>
            </Module>
        </PutBody>
    )
}