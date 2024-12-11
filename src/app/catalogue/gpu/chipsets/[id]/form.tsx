'use client';
import {PutFormProps} from '@/server/models'
import {GraphicsProcessorChipset, GraphicsProcessorChipsetDbo} from '@/server/models/components';
import {Content, Module, PutBody, Row} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';

export function Form({item, action}: PutFormProps<GraphicsProcessorChipset, GraphicsProcessorChipsetDbo>) {

    const [name, setName] = useState<string | undefined>(item?.name)

    return (
        <PutBody name="chipset" submitAction={async () => await action({name})}>
            <Module title="Graphics processor chipset details" subtitle="View and modify this Graphics processor chipset's details.">
                <Content>
                    <Row>
                        <NumberField value={item?.id} label="ID" isReadOnly/>
                        <TextField label="Name" name="name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PutBody>
    )
}