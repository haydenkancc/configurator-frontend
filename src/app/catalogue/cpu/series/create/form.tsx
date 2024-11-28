'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import {CentralProcessorSeriesDbo} from '@/server/models/components';

export function Form({action}: PostFormProps<CentralProcessorSeriesDbo>) {

    const [name, setName] = useState<string | undefined>()


    return (
        <PostBody name="series" submitAction={async () => await action({name})}>
            <Module title="Central processor series details" subtitle="Specify details for a new central processor series.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}