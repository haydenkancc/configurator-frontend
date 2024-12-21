'use client';
import {PutFormProps} from '@/server/models'
import { M2 } from '@/server/models/catalogue';
import {Content, Module, PostBody, PutBody, Row} from '@/components/catalogue/views/item-view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {useListData} from 'react-stately';
import {useFilter} from '@react-aria/i18n';
import {
    M2FormFactorsListBuilder,
    M2KeyComboBox,
    PcieSizeComboBox,
    PcieVersionComboBox
} from '@/components/catalogue/views/forms';

export function Form({item, action, params}: PutFormProps<M2.SlotDto, M2.SlotDbo, M2.SlotParams>) {

    const [keyID, setKeyID] = useState<number | null>(item?.key.id ?? null);
    const [versionID, setVersionID] = useState<number | null>(item?.version.id ?? null);
    const [laneSizeID, setLaneSizeID] = useState<number | null>(item?.laneSize.id ?? null);

    console.log(item)

    const compatibleFormFactors= useListData<M2.SlotDtoSimple>({
        initialItems: item?.formFactors,
    });
    return (
        <PutBody name="slot" submitAction={async () => await action({
            keyID: keyID,
            versionID: versionID,
            laneSizeID: laneSizeID,
            formFactorIDs: compatibleFormFactors.items.map(({id}) => id),
        })}>
            <Module title="M.2 slot details" subtitle="Specify details for a new M.2 slot.">
                <Content>
                    <Row>
                        <M2KeyComboBox selectedKey={keyID} onSelectionChange={setKeyID} grow defaultItems={params?.keys} />
                    </Row>
                    <Row>
                        <PcieVersionComboBox label="PCIe version" selectedKey={versionID} onSelectionChange={setVersionID} grow defaultItems={params?.versions} />
                        <PcieSizeComboBox label="Lane size" selectedKey={laneSizeID} onSelectionChange={setLaneSizeID} grow defaultItems={params?.laneSizes} />
                    </Row>
                </Content>
            </Module>
            <Module title="Compatible form factors" subtitle="Specify which form factors are compatible with this slot.">
                <Content>
                    <M2FormFactorsListBuilder compatibleFormFactors={compatibleFormFactors} formFactors={params?.formFactors} />
                </Content>
            </Module>
        </PutBody>
    )
}