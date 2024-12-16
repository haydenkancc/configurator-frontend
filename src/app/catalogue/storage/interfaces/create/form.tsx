'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import {StorageDriveInterfaceDbo} from '@/server/models/components';

export function Form({action}: PostFormProps<StorageDriveInterfaceDbo>) {

    const [name, setName] = useState('')


    return (
        <PostBody name="type" submitAction={async () => await action({name})}>
            <Module title="Storage drive interface details" subtitle="Specify details for a new storage drive interface.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}