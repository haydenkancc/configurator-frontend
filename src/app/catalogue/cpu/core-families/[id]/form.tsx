'use client';
import {PutFormProps} from '@/server/models'
import {
    CentralProcessorCoreFamily,
    CentralProcessorCoreFamilyDbo,
    CentralProcessorCoreFamilyParams
} from '@/server/models/components';
import {Content, Module, PostBody, PutBody, Row} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {CentralProcessorMicroarchitectureComboBox} from '@/app/catalogue/_templates/forms';

export function Form({item, action, params}: PutFormProps<CentralProcessorCoreFamily, CentralProcessorCoreFamilyDbo, CentralProcessorCoreFamilyParams>) {

    console.log(item)
    const [name, setName] = useState<string | undefined>(item?.name);
    const [microarchitectureID, setMicroarchitectureID] = useState<number | undefined>(item?.microarchitecture.id);


    return (
        <PutBody name="core family" submitAction={async () => await action({name, microarchitectureID})}>
            <Module title="Central processor core family details" subtitle="Specify details for a new central processor core family.">
                <Content>
                    <Row>
                        <NumberField label="ID" value={item?.id} isReadOnly />
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                    <Row>
                        <CentralProcessorMicroarchitectureComboBox
                            selectedKey={microarchitectureID}
                            onSelectionChange={(key) => setMicroarchitectureID(key as number)}
                            defaultItems={params?.microarchitectures}
                        />
                    </Row>
                </Content>
            </Module>
        </PutBody>
    )
}