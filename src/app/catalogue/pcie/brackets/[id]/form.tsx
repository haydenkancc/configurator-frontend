'use client';
import {PCIeBracket, PCIeBracketDbo, PutFormProps} from '@/server/models';
import {Content, Footer, Module, Row, Controls, BackLink, PutBody} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {Button} from '@/components/ui/button';
import {useState} from 'react';

export function Form({ item, action } : PutFormProps<PCIeBracket, PCIeBracketDbo>) {

    const [ name, setName ] = useState(item ? item.name : '')

    return (
        <PutBody name="bracket" submitAction={async () => await action({ name })}>
            <Module title="PCIe bracket details" subtitle="View and modify this PCIe bracket's details.">
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