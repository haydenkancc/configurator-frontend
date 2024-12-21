'use client';
import {PutFormProps} from '@/server/models'
import { CentralProcessor } from '@/server/models/catalogue';
import {Content, Module, PutBody, Row} from '@/components/catalogue/views/item-view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {CentralProcessorMicroarchitectureComboBox} from '@/components/catalogue/views/forms/central-processor';

export function Form({item, action, params}: PutFormProps<CentralProcessor.CoreFamilyDto, CentralProcessor.CoreFamilyDbo, CentralProcessor.CoreFamilyParams>) {

    const [codeName, setCodeName] = useState<string>(item?.codeName ?? "")
    const [alternateName, setAlternateName] = useState<string>(item?.alternateName ?? "")
    const [microarchitectureID, setMicroarchitectureID] = useState<number | null>(item?.microarchitecture.id ?? null);

    return (
        <PutBody name="core family" submitAction={async () => await action({
            codeName: codeName,
            alternateName: alternateName,
            microarchitectureID: microarchitectureID,
        })}>
            <Module title="Core family details" subtitle="View and modify this core family's details.">
                <Content>
                    <Row>
                        <NumberField value={item?.id} label="ID" grow isReadOnly/>
                    </Row>
                    <Row>
                        <TextField label="Code name" value={codeName} onChange={setCodeName} grow isRequired/>
                        <TextField label="Alternate name" value={alternateName} onChange={setAlternateName} grow isRequired/>
                    </Row>
                    <Row>
                        <CentralProcessorMicroarchitectureComboBox selectedKey={microarchitectureID} onSelectionChange={setMicroarchitectureID} defaultItems={params?.microarchitectures} />
                    </Row>
                </Content>
            </Module>
        </PutBody>
    )
}