'use client'
import {Content, Module, PostBody, PutBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import { CentralProcessor } from '@/server/models/catalogue';
import {NumberField} from '@/components/ui/number-field';
import {CentralProcessorMicroarchitectureComboBox} from '@/components/catalogue/views/forms/central-processor';

export function Form({action, params}: PostFormProps<CentralProcessor.CoreFamilyDbo, CentralProcessor.CoreFamilyParams>) {

    const [codeName, setCodeName] = useState<string>("")
    const [alternateName, setAlternateName] = useState<string>("")
    const [microarchitectureID, setMicroarchitectureID] = useState<number | null>(null);

    return (
        <PostBody name="core family" submitAction={async () => await action({
            codeName: codeName,
            alternateName: alternateName,
            microarchitectureID: microarchitectureID,
        })}>
            <Module title="Core family details" subtitle="View and modify this core family's details.">
                <Content>
                    <Row>
                        <TextField label="Code name" value={codeName} onChange={setCodeName} grow isRequired/>
                        <TextField label="Alternate name" value={alternateName} onChange={setAlternateName} grow isRequired/>
                    </Row>
                    <Row>
                        <CentralProcessorMicroarchitectureComboBox selectedKey={microarchitectureID} onSelectionChange={setMicroarchitectureID} defaultItems={params?.microarchitectures} />
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}