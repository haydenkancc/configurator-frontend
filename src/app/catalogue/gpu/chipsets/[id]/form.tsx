'use client';
import {PutFormProps} from '@/server/models'
import { GraphicsCard } from '@/server/models/catalogue';
import {Content, Module, PutBody, Row} from '@/components/catalogue/views/item-view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';

export function Form({item, action}: PutFormProps<GraphicsCard.ChipsetDto, GraphicsCard.ChipsetDbo, null>) {

    const [name, setName] = useState<string>(item?.name ?? "")

    return (
        <PutBody name="chipset" submitAction={async () => await action({
            name: name,
        })}>
            <Module title="Chipset details" subtitle="View and modify this chipset's details.">
                <Content>
                    <Row>
                        <NumberField value={item?.id} label="ID" isReadOnly/>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PutBody>
    )
}