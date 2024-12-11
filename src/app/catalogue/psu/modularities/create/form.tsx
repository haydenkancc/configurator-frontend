'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import {PowerSupplyModularityDbo} from '@/server/models/components';

export function Form({ action } : PostFormProps<PowerSupplyModularityDbo>) {

    const [ name, setName ] = useState('')


    return (
        <PostBody name="modularity" submitAction={async () => await action({name})}>
            <Module title="Power supply modularity details" subtitle="Specify details for a new power supply modularity.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired />
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}