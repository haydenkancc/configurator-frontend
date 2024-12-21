'use client'
import {Content, Module, PostBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import { PowerSupply } from '@/server/models/catalogue';

export function Form({action}: PostFormProps<PowerSupply.EfficiencyRatingDbo, null>) {

    const [name, setName] = useState<string>("")


    return (
        <PostBody name="efficiency rating" submitAction={async () => await action({
            name: name,
        })}>
            <Module title="Power supply efficiency rating details" subtitle="Specify details for a new power supply efficiency rating.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}