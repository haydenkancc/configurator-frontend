'use client';
import {PutFormProps} from '@/server/models'
import { Pcie } from '@/server/models/catalogue';
import {Content, Module, PutBody, Row} from '@/components/catalogue/views/item-view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';

export function Form({item, action}: PutFormProps<Pcie.BracketDto, Pcie.BracketDbo, null>) {

    const [name, setName] = useState<string | null>(item? item.name : null);

    return (
        <PutBody name="bracket" submitAction={async () => await action({
            name: name,
        })}>
            <Module title="PCIe bracket details" subtitle="View and modify this PCIe bracket's details.">
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