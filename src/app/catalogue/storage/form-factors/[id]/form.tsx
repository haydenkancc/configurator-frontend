'use client';
import {PutFormProps} from '@/server/models'
import {CaseStorageFormFactor, CaseStorageFormFactorDbo} from '@/server/models/components';
import {Content, Module, PutBody, Row} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';

export function Form({ item, action } : PutFormProps<CaseStorageFormFactor, CaseStorageFormFactorDbo>) {

    const [ name, setName ] = useState(item ? item.name : '')

    return (
        <PutBody name="form factor" submitAction={async () => await action({ name })}>
            <Module title="Case storage form factor details" subtitle="View and modify this case storage form factor's details.">
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