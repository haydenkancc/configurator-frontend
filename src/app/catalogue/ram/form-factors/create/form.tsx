'use client'
import {Content, Module, PostBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import { Memory } from '@/server/models/catalogue';

export function Form({action}: PostFormProps<Memory.FormFactorDbo, null>) {

    const [name, setName] = useState<string>("")


    return (
        <PostBody name="form factor" submitAction={async () => await action({
            name: name,
        })}>
            <Module title="Memory form factor details" subtitle="Specify details for a new memory form factor.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}