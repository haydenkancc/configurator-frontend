'use client'
import {BackLink, Content, Controls, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PCIeVersion, PCIeVersionDbo, PostFormProps} from '@/server/models';

export function Form({ action } : PostFormProps<PCIeVersionDbo>) {

    const [ name, setName ] = useState('')


    return (
        <PostBody name="version" submitAction={async () => await action({name})}>
            <Module title="PCIe version details" subtitle="Specify details for a new PCIe version.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired />
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}