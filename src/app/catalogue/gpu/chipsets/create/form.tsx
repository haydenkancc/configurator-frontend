'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import {GraphicsProcessorChipsetDbo} from '@/server/models/components';

export function Form({action}: PostFormProps<GraphicsProcessorChipsetDbo>) {

    const [name, setName] = useState('')


    return (
        <PostBody name="chipset" submitAction={async () => await action({name})}>
            <Module title="Graphics processor chipset details" subtitle="Specify details for a new Graphics processor chipset.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}