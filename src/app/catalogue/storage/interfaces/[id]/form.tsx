'use client';
import {PutFormProps} from '@/server/models'
import {StorageDriveInterface, StorageDriveInterfaceDbo} from '@/server/models/components';
import {Content, Module, PutBody, Row} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';

export function Form({item, action}: PutFormProps<StorageDriveInterface, StorageDriveInterfaceDbo>) {

    const [name, setName] = useState<string | undefined>(item?.name)

    return (
        <PutBody name="type" submitAction={async () => await action({name})}>
            <Module title="Storage drive interface details" subtitle="View and modify this storage drive interface's details.">
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