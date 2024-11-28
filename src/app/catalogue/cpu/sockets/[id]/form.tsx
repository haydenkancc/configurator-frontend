'use client';
import {PutFormProps} from '@/server/models'
import {CentralProcessorSocket, CentralProcessorSocketDbo} from '@/server/models/components';
import {Content, Module, PutBody, Row} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';

export function Form({item, action}: PutFormProps<CentralProcessorSocket, CentralProcessorSocketDbo>) {

    const [name, setName] = useState<string | undefined>(item?.name)

    return (
        <PutBody name="socket" submitAction={async () => await action({name})}>
            <Module title="Central processor socket details" subtitle="View and modify this central processor socket's details.">
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