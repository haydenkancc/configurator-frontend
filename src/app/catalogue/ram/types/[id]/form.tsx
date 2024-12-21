'use client';
import {PutFormProps} from '@/server/models'
import { Memory } from '@/server/models/catalogue';
import {Content, Module, PutBody, Row} from '@/components/catalogue/views/item-view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';

export function Form({item, action}: PutFormProps<Memory.TypeDto, Memory.TypeDbo, null>) {

    const [name, setName] = useState<string | null>(item? item.name : null);

    return (
        <PutBody name="type" submitAction={async () => await action({
            name: name,
        })}>
            <Module title="Memory type details" subtitle="View and modify this memory type's details.">
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