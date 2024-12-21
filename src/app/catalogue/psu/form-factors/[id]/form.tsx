'use client';
import {PutFormProps} from '@/server/models'
import { PowerSupply } from '@/server/models/catalogue';
import {Content, Module, PutBody, Row} from '@/components/catalogue/views/item-view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';

export function Form({item, action}: PutFormProps<PowerSupply.FormFactorDto, PowerSupply.FormFactorDbo, null>) {

    const [name, setName] = useState<string>(item?.name ?? "")

    return (
        <PutBody name="form factor" submitAction={async () => await action({
            name: name,
        })}>
            <Module title="Form factor details" subtitle="View and modify this form factor's details.">
                <Content>
                    <Row>
                        <NumberField value={item?.id} label="ID" isReadOnly/>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PutBody>
    )
}