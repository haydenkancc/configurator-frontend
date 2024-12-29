'use client'
import {Content, Module, PostBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import { Motherboard } from '@/server/models/catalogue';
import {CentralProcessorSocketComboBox} from '@/components/catalogue/views/forms';

export function Form({action, params}: PostFormProps<Motherboard.ChipsetDbo, Motherboard.ChipsetParams>) {

    const [name, setName] = useState<string>("");
    const [socketID, setSocketID] = useState<number | null>(null);


    return (
        <PostBody name="chipset" submitAction={async () => await action({
            name: name,
            socketID: socketID,
        })}>
            <Module title="Motherboard chipset details" subtitle="Specify details for a new motherboard chipset.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                    <Row>
                        <CentralProcessorSocketComboBox selectedKey={socketID} onSelectionChange={setSocketID} defaultItems={params?.sockets} />
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}