'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import {CentralProcessorCoreFamilyDbo, CentralProcessorCoreFamilyParams} from '@/server/models/components';
import {MicroarchitectureComboBox} from '@/app/catalogue/cpu/core-families/fields';

export function Form({action, params}: PostFormProps<CentralProcessorCoreFamilyDbo, CentralProcessorCoreFamilyParams>) {

    const [name, setName] = useState<string | undefined>();
    const [microarchitectureID, setMicroarchitectureID] = useState<number | undefined>();


    return (
        <PostBody name="core family" submitAction={async () => await action({name, microarchitectureID})}>
            <Module title="Central processor core family details" subtitle="Specify details for a new central processor core family.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                    <Row>
                        <MicroarchitectureComboBox
                            selectedKey={microarchitectureID}
                            onSelectionChange={(key) => setMicroarchitectureID(key as number)}
                            items={params?.microarchitectures}
                        />
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}