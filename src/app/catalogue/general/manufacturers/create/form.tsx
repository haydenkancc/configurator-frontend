'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import {ManufacturerDbo} from '@/server/models/components';

export function Form({action}: PostFormProps<ManufacturerDbo>) {

    const [name, setName] = useState('')


    return (
        <PostBody name="manufacturer" submitAction={async () => await action({name})}>
            <Module title="Manufacturer details" subtitle="Specify details for a new manufacturer.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}