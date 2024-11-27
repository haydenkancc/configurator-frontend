'use client';
import {M2FormFactor, M2FormFactorDbo, PutFormProps} from '@/server/models';
import {Content, Footer, Module, Row, Controls, BackLink, PutBody} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {Button} from '@/components/ui/button';
import {useState} from 'react';

export function Form({ item, action } : PutFormProps<M2FormFactor, M2FormFactorDbo>) {

    const [ name, setName ] = useState(item ? item.name : '')

    return (
        <PutBody name="form factor" submitAction={async () => await action({ name })}>
            <Module title="M.2 form factor details" subtitle="View and modify this M.2 form factor's details.">
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