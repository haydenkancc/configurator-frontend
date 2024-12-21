'use client'
import {Content, Module, PostBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import { Pcie } from '@/server/models/catalogue';

export function Form({action}: PostFormProps<Pcie.VersionDbo, null>) {

    const [name, setName] = useState<string>("")


    return (
        <PostBody name="version" submitAction={async () => await action({
            name: name,
        })}>
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