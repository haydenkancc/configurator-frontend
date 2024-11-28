'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import {PCIeBracketDbo} from '@/server/models/components';

export function Form({action}: PostFormProps<PCIeBracketDbo>) {

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