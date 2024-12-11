'use client';
import {PutFormProps} from '@/server/models'
import {
    MotherboardChipset,
    MotherboardChipsetDbo,
    MotherboardChipsetParams
} from '@/server/models/components';
import {Content, Module, PostBody, PutBody, Row} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {CentralProcessorSocketComboBox} from '@/app/catalogue/_templates/forms';

export function Form({item, action, params}: PutFormProps<MotherboardChipset, MotherboardChipsetDbo, MotherboardChipsetParams>) {

    console.log(item)
    const [name, setName] = useState<string | undefined>(item?.name);
    const [socketID, setSocketID] = useState<number | undefined>(item?.socket.id);


    return (
        <PutBody name="chipset" submitAction={async () => await action({name, socketID})}>
            <Module title="Central processor chipset details" subtitle="Specify details for a new central processor chipset.">
                <Content>
                    <Row>
                        <NumberField label="ID" value={item?.id} isReadOnly />
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                    <Row>
                        <CentralProcessorSocketComboBox
                            selectedKey={socketID}
                            onSelectionChange={(key) => setSocketID(key as number)}
                            defaultItems={params?.sockets}
                        />
                    </Row>
                </Content>
            </Module>
        </PutBody>
    )
}