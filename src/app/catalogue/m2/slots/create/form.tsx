'use client'
import {BackLink, Content, Controls, FormBody, Module, Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import {TextField} from '@/components/ui/text-field';
import React, {useState} from 'react';
import {useFilter} from '@react-aria/i18n';
import {ListData, useListData} from 'react-stately';
import {M2FormFactor, M2SlotParams} from '@/server/models';
import {
    ListBuilder,
    ListBuilderAddButton,
    ListBuilderComboBox, ListBuilderComboBoxItem,
    ListBuilderList,
    ListBuilderListItem,
    ListBuilderRow,
    ListBuilderTrashButton
} from '@/components/ui/list-builder';
import {Key} from 'react-aria-components';
import {M2KeySelect, M2LaneSizeSelect, M2VersionSelect} from '@/app/catalogue/m2/slots/fields';

interface FormProps {
    slotParams: M2SlotParams | undefined;
    action: (formFactors: M2FormFactor[], keyID?: Key, laneSizeID?: Key, versionID?: Key) => Promise<void>
}
export function Form({ slotParams, action } : FormProps) {
    const [ keyID, setKeyID ] = useState<Key>();
    const [ versionID, setVersionID ] = useState<Key>();
    const [ laneSizeID, setLaneSizeID ] = useState<Key>();

    let { contains } = useFilter({ sensitivity: 'base' });

    const initialItems: ListData<M2FormFactor> = useListData({
        initialItems: [],
        getKey: (item: M2FormFactor) => item.id,
    });

    const items = useListData({
        initialItems: slotParams?.formFactors,
        getKey: (item) => item.id,
        filter: (item, filterText) => contains(item.name, filterText)
    });

    return (
        <FormBody action={async () => await action(initialItems.items, keyID, laneSizeID, versionID)}>
            <Controls>
                <BackLink />
                <Button variant="primary" type="submit">
                    Create slot
                </Button>
            </Controls>
            <Module title="M.2 slot details" subtitle="Specify details for a new M.2 slot.">
                <Content>
                    <Row>
                        <M2KeySelect onSelectionChange={setKeyID} grow items={slotParams?.keys} />
                    </Row>
                    <Row>
                        <M2VersionSelect onSelectionChange={setVersionID} grow items={slotParams?.versions} />
                        <M2LaneSizeSelect onSelectionChange={setLaneSizeID} grow items={slotParams?.laneSizes} />
                    </Row>
                </Content>
            </Module>
            <Module title="Compatible form factors" subtitle="Specify which form factors are compatible with this slot.">
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
            </Module>
        </FormBody>
    )
}