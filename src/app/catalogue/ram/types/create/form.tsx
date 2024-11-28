'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import {MemoryTypeDbo} from '@/server/models/components';

export function Form({action}: PostFormProps<MemoryTypeDbo>) {

    const [name, setName] = useState('')


    return (
        <PostBody name="type" submitAction={async () => await action({name})}>
            <Module title="Memory type details" subtitle="Specify details for a new memory type.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}