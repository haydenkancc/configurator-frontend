'use client';
import {PutFormProps} from '@/server/models'
import {PowerSupplyModularity, PowerSupplyModularityDbo} from '@/server/models/components';
import {Content, Module, PutBody, Row} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';

export function Form({ item, action } : PutFormProps<PowerSupplyModularity, PowerSupplyModularityDbo>) {

    const [ name, setName ] = useState(item ? item.name : '')

    return (
        <PutBody name="modularity" submitAction={async () => await action({ name })}>
            <Module title="Power supply modularity details" subtitle="View and modify this power supply modularity's details.">
                <Content>
                    <Row>
                        <NumberField value={item?.id} label="ID" isReadOnly />
                        <TextField label="Name" name="name" value={name} onChange={setName} grow isRequired />
                    </Row>
                </Content>
            </Module>
        </PutBody>
    )
}