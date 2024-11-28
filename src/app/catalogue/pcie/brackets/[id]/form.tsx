'use client';
import {PutFormProps} from '@/server/models'
import {PCIeBracket, PCIeBracketDbo} from '@/server/models/components';
import {Content, Module, PutBody, Row} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';

export function Form({item, action}: PutFormProps<PCIeBracket, PCIeBracketDbo>) {

    const [name, setName] = useState<string | undefined>(item?.name)

    return (
        <PutBody name="bracket" submitAction={async () => await action({name})}>
            <Module title="PCIe bracket details" subtitle="View and modify this PCIe bracket's details.">
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