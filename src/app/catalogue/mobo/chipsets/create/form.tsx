'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import {MotherboardChipsetDbo, MotherboardChipsetParams} from '@/server/models/components';
import {CentralProcessorSocketComboBox} from '@/app/catalogue/_templates/forms';

export function Form({action, params}: PostFormProps<MotherboardChipsetDbo, MotherboardChipsetParams>) {

    const [name, setName] = useState<string | undefined>();
    const [socketID, setSocketID] = useState<number | undefined>();


    return (
        <PostBody name="chipset" submitAction={async () => await action({name, socketID})}>
            <Module title="Central processor chipset details" subtitle="Specify details for a new central processor chipset.">
                <Content>
                    <Row>
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
        </PostBody>
    )
}