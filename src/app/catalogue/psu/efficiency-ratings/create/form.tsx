'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import {PowerSupplyEfficiencyRatingDbo} from '@/server/models/components';

export function Form({ action } : PostFormProps<PowerSupplyEfficiencyRatingDbo>) {

    const [ name, setName ] = useState('')


    return (
        <PostBody name="efficiency rating" submitAction={async () => await action({name})}>
            <Module title="Power supply efficiency rating details" subtitle="Specify details for a new power supply efficiency rating.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired />
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}