'use client'
import {Content, Module, PostBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import { Storage } from '@/server/models/catalogue';

export function Form({action}: PostFormProps<Storage.FormFactorDbo, null>) {

    const [name, setName] = useState<string>("")


    return (
        <PostBody name="form factor" submitAction={async () => await action({
            name: name,
        })}>
            <Module title="Storage form factor details" subtitle="Specify details for a new storage form factor.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}