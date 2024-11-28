'use client'
import {PutFormProps} from '@/server/models'
import {M2FormFactor, M2Slot, M2SlotDbo, M2SlotParams} from '@/server/models/components';
import {useFilter} from '@react-aria/i18n';
import {ListData, useListData} from 'react-stately';
import {Content, Module, PutBody, Row} from '@/app/catalogue/_templates/view';
import React, {useState} from 'react';
import {NumberField} from '@/components/ui/number-field';
import {M2FormFactorsListBuilder, M2KeySelect, M2LaneSizeSelect, M2VersionSelect} from '../fields';

export function Form({ item, action, params } : PutFormProps<M2Slot, M2SlotDbo, M2SlotParams>) {

    let { contains } = useFilter({ sensitivity: 'base' });

    const initialItems: ListData<M2FormFactor> = useListData({
        initialItems: item?.formFactors,
        getKey: (item: M2FormFactor) => item.id,
    });

    const items = useListData({
        initialItems: params?.formFactors.filter(({ id   }) => !(initialItems.getItem(id) || id === item?.id)),
        getKey: (item) => item.id,
        filter: (item, filterText) => contains(item.name, filterText)
    });

    const [ keyID, setKeyID ] = useState<number | undefined>(item?.key.id);
    const [ versionID, setVersionID ] = useState<number | undefined>(item?.version.id);
    const [ laneSizeID, setLaneSizeID ] = useState<number | undefined>(item?.laneSize.laneCount);

    return (
        <PutBody name="slot"
                  submitAction={async () => await action({ formFactorIDs: initialItems.items.map(({id}) => id), keyID, laneSizeID, versionID })}>
            <Module title="M.2 slot details" subtitle="Specify details for a new M.2 slot.">
                <Content>
                    <Row>
                        <NumberField grow isReadOnly value={item?.id} label="ID" />
                    </Row>
                    <Row>
                        <M2KeySelect selectedKey={keyID} onSelectionChange={(key) => setKeyID(key as number)} grow items={params?.keys} />
                    </Row>
                    <Row>
                        <M2VersionSelect selectedKey={versionID} onSelectionChange={(key) => setVersionID(key as number)} grow items={params?.versions} />
                        <M2LaneSizeSelect selectedKey={laneSizeID} onSelectionChange={(key) => setLaneSizeID(key as number)} grow items={params?.laneSizes} />
                    </Row>
                </Content>
            </Module>
            <Module title="Compatible form factors" subtitle="Specify which form factors are compatible with this slot.">
                <Content>
                    <M2FormFactorsListBuilder gridListItems={initialItems} comboBoxItems={items} />
                </Content>
            </Module>
        </PutBody>
    )
}
