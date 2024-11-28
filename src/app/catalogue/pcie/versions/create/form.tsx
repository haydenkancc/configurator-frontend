'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import {PCIeVersionDbo} from '@/server/models/components';

export function Form({action}: PostFormProps<PCIeVersionDbo>) {

    const [name, setName] = useState('')


    return (
        <PostBody name="version" submitAction={async () => await action({name})}>
            <Module title="PCIe version details" subtitle="Specify details for a new PCIe version.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}