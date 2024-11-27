'use client'
import {BackLink, Content, Controls, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import {TextField} from '@/components/ui/text-field';
import React, {useState} from 'react';
import {useFilter} from '@react-aria/i18n';
import {ListData, useListData} from 'react-stately';
import {M2FormFactor, M2SlotDbo, M2SlotParams, PostFormProps} from '@/server/models';
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


export function Form({ action, params } : PostFormProps<M2SlotDbo, M2SlotParams>) {

    let { contains } = useFilter({ sensitivity: 'base' });

    const initialItems: ListData<M2FormFactor> = useListData({
        initialItems: [],
        getKey: (item: M2FormFactor) => item.id,
    });

    const items = useListData({
        initialItems: params?.formFactors,
        getKey: (item) => item.id,
        filter: (item, filterText) => contains(item.name, filterText)
    });

    const [ keyID, setKeyID ] = useState<number | undefined>();
    const [ versionID, setVersionID ] = useState<number | undefined>();
    const [ laneSizeID, setLaneSizeID ] = useState<number | undefined>();

    return (
        <PostBody name="slot"
                  submitAction={async () => await action({ formFactorIDs: initialItems.items.map(({id}) => id), keyID, laneSizeID, versionID })}>
            <Module title="M.2 slot details" subtitle="Specify details for a new M.2 slot.">
                <Content>
                    <Row>
                        <M2KeySelect onSelectionChange={(key) => setKeyID(key as number)} grow items={params?.keys} />
                    </Row>
                    <Row>
                        <M2VersionSelect onSelectionChange={(key) => setVersionID(key as number)} grow items={params?.versions} />
                        <M2LaneSizeSelect onSelectionChange={(key) => setLaneSizeID(key as number)} grow items={params?.laneSizes} />
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
        </PostBody>
    )
}