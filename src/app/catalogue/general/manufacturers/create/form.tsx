'use client'
import {Content, Module, PostBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import { General } from '@/server/models/catalogue';

export function Form({action}: PostFormProps<General.ManufacturerDbo, null>) {

    const [name, setName] = useState<string>("")


    return (
        <PostBody name="manufacturer" submitAction={async () => await action({
            name: name,
        })}>
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