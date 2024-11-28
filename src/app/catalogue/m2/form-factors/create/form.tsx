'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import {M2FormFactorDbo} from '@/server/models/components';

export function Form({ action } : PostFormProps<M2FormFactorDbo>) {

    const [ name, setName ] = useState('')


    return (
        <PostBody name="form factor" submitAction={async () => await action({name})}>
            <Module title="M.2 form factor details" subtitle="Specify details for a new M.2 form factor.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired />
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}