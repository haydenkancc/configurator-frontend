'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import {MemoryCapacityDbo} from '@/server/models/components';
import {NumberField} from '@/components/ui/number-field';

export function Form({action}: PostFormProps<MemoryCapacityDbo>) {

    const [size, setSize] = useState<number>()


    return (
        <PostBody name="capacity" submitAction={async () => await action({size})}>
            <Module title="Memory capacity details" subtitle="Specify details for a new memory capacity.">
                <Content>
                    <Row>
                        <NumberField label="Size (GB)" value={size} onChange={setSize} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}