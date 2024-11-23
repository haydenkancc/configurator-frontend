'use client'
import {M2FormFactor, M2Slot, M2SlotParams} from '@/server/models';
import {useFilter} from '@react-aria/i18n';
import {useListData} from 'react-stately';
import {Content, Footer, FormModule, Row} from '@/app/catalogue/_templates/view';
import {
    ListBuilder, ListBuilderAddButton, ListBuilderComboBox, ListBuilderComboBoxItem,
    ListBuilderList,
    ListBuilderListItem,
    ListBuilderRow,
    ListBuilderTrashButton
} from '@/components/ui/list-builder';
import {Button} from '@/components/ui/button';
import React, {useState} from 'react';
import NumberField from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {M2KeySelect, M2LaneSizeSelect, M2VersionSelect} from '@/app/catalogue/m2/slots/fields';
import {Key} from 'react-aria-components';

interface SlotsProps {
    m2slot: M2Slot;
    slotParams: M2SlotParams | undefined;
    action: (formFactors: M2FormFactor[]) => Promise<void>;
}

export function FormFactors({m2slot, slotParams, action} : SlotsProps) {

    let { contains } = useFilter({ sensitivity: 'base' });

    const initialItems= useListData({
        initialItems: m2slot.formFactors,
        getKey: (item) => item.id
    });

    const items = useListData({
        initialItems: slotParams?.formFactors.filter(({ id }) => !(initialItems.getItem(id) || id === m2slot.id)),
        getKey: (item) => item.id,
        filter: (item, filterText) => contains(item.name, filterText)
    }); 

    return (
        <FormModule title="Compatible form factors" subtitle="Specify which form factors are compatible with this slot." action={async () => await action(initialItems.items)}>
            <Content>
                <ListBuilder initialItems={initialItems} items={items}>
                    <ListBuilderList<M2FormFactor>>
                        {item =><ListBuilderListItem>{item.name}<ListBuilderTrashButton /></ListBuilderListItem>}
                    </ListBuilderList>
                    <ListBuilderRow>
                        <ListBuilderComboBox<M2FormFactor>>
                            {item =>
                                <ListBuilderComboBoxItem>
                                    {item.name}
                                </ListBuilderComboBoxItem>
                            }
                        </ListBuilderComboBox>
                        <ListBuilderAddButton />
                    </ListBuilderRow>
                </ListBuilder>
            </Content>
            <Footer>
                <Button type="reset" variant="neutral">
                    Cancel
                </Button>
                <Button type="submit" variant="primary">
                    Save changes
                </Button>
            </Footer>
        </FormModule>
    )
}

interface DetailsProps {
    m2slot: M2Slot;
    slotParams: M2SlotParams | undefined;
    action: (keyID?: Key, versionID?: Key, laneSizeID?: Key) => Promise<void>;
}

export function Details({m2slot, slotParams, action} : DetailsProps) {

    const [ keyID, setKeyID ] = useState<Key>();
    const [ versionID, setVersionID ] = useState<Key>();
    const [ laneSizeID, setLaneSizeID ] = useState<Key>();

    return (
        <FormModule title="M.2 slot details" subtitle="View and modify this M.2 slot's details." action={async () => await action(keyID, versionID, laneSizeID)}>
            <Content>
                <Row>
                    <NumberField value={m2slot.id} label="ID" isReadOnly grow/>
                </Row>
                <Row>
                    <M2KeySelect defaultSelectedKey={m2slot.key.id} onSelectionChange={setKeyID} grow items={slotParams?.keys} />
                </Row>
                <Row>
                    <M2VersionSelect defaultSelectedKey={m2slot.version.id} onSelectionChange={setVersionID} grow items={slotParams?.versions} />
                    <M2LaneSizeSelect defaultSelectedKey={m2slot.laneSize.id} onSelectionChange={setLaneSizeID} grow items={slotParams?.laneSizes} />
                </Row>
            </Content>
            <Footer>
                <Button type="reset" variant="neutral">
                    Cancel
                </Button>
                <Button type="submit" variant="primary">
                    Save changes
                </Button>
            </Footer>
        </FormModule>
    )
}