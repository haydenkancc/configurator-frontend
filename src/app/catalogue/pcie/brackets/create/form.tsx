'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import { Pcie } from '@/server/models/catalogue';

export function Form({action}: PostFormProps<Pcie.BracketDbo>) {

    const [name, setName] = useState('')


    return (
        <PostBody name="bracket" submitAction={async () => await action({name})}>
            <Module title="PCIe bracket details" subtitle="Specify details for a new PCIe bracket.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}