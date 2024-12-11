'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import {MotherboardFormFactorDbo} from '@/server/models/components';

export function Form({ action } : PostFormProps<MotherboardFormFactorDbo>) {

    const [ name, setName ] = useState('')


    return (
        <PostBody name="form factor" submitAction={async () => await action({name})}>
            <Module title="Motherboard form factor details" subtitle="Specify details for a new motherboard form factor.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired />
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}