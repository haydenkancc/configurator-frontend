'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import {CentralProcessorChannelDbo} from '@/server/models/components';

export function Form({action}: PostFormProps<CentralProcessorChannelDbo>) {

    const [name, setName] = useState<string | undefined>()


    return (
        <PostBody name="channel" submitAction={async () => await action({name})}>
            <Module title="Central processor channel details" subtitle="Specify details for a new central processor channel.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}