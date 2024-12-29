'use client';
import {PutFormProps} from '@/server/models'
import { Motherboard } from '@/server/models/catalogue';
import {Content, Module, PutBody, Row} from '@/components/catalogue/views/item-view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {CentralProcessorSocketComboBox} from '@/components/catalogue/views/forms';

export function Form({item, action, params}: PutFormProps<Motherboard.ChipsetDto, Motherboard.ChipsetDbo, Motherboard.ChipsetParams>) {

    const [name, setName] = useState<string | null>(item?.name ?? null);
    const [socketID, setSocketID] = useState<number | null>(item?.socket.id ?? null);

    return (
        <PutBody name="chipset" submitAction={async () => await action({
            name: name,
            socketID: socketID,
        })}>
            <Module title="Motherboard chipset details" subtitle="View and modify this motherboard chipset's details.">
                <Content>
                    <Row>
                        <NumberField value={item?.id} label="ID" isReadOnly/>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                    <Row>
                        <CentralProcessorSocketComboBox selectedKey={socketID} onSelectionChange={setSocketID} defaultItems={params?.sockets} />
                    </Row>
                </Content>
            </Module>
        </PutBody>
    )
}