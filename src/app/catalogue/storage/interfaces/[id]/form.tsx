'use client';
import {PutFormProps} from '@/server/models'
import { Storage } from '@/server/models/catalogue';
import {Content, Module, PutBody, Row} from '@/components/catalogue/views/item-view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';

export function Form({item, action}: PutFormProps<Storage.ConnectionInterfaceDto, Storage.ConnectionInterfaceDbo, null>) {

    const [name, setName] = useState<string>(item?.name ?? "")

    return (
        <PutBody name="interface" submitAction={async () => await action({
            name: name,
        })}>
            <Module title="Interface details" subtitle="View and modify this interface's details.">
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