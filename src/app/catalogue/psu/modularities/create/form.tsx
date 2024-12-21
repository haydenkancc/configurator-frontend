'use client'
import {Content, Module, PostBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import { PowerSupply } from '@/server/models/catalogue';

export function Form({action}: PostFormProps<PowerSupply.ModularityDbo, null>) {

    const [name, setName] = useState<string>("")


    return (
        <PostBody name="modularity" submitAction={async () => await action({
            name: name,
        })}>
            <Module title="Modularity details" subtitle="Specify details for a new modularity.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}