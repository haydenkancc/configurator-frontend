'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import {SolidStateDriveNandTypeDbo} from '@/server/models/components';

export function Form({action}: PostFormProps<SolidStateDriveNandTypeDbo>) {

    const [name, setName] = useState('')


    return (
        <PostBody name="type" submitAction={async () => await action({name})}>
            <Module title="Solid state drive NAND type details" subtitle="Specify details for a new solid state drive NAND type.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}