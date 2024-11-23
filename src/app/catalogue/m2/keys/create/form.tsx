'use client'
import {BackLink, Content, Controls, FormBody, Module, Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import {TextField} from '@/components/ui/text-field';
import React, {useState} from 'react';
import {useFilter} from '@react-aria/i18n';
import {ListData, useListData} from 'react-stately';
import {M2Key, M2KeyBase, M2KeyParams} from '@/server/models';
import {
    ListBuilder,
    ListBuilderAddButton,
    ListBuilderComboBox, ListBuilderComboBoxItem,
    ListBuilderList,
    ListBuilderListItem,
    ListBuilderRow,
    ListBuilderTrashButton
} from '@/components/ui/list-builder';

interface FormProps {
    keyParams: M2KeyParams | undefined;
    action: (name: string, compatibleKeys: M2KeyBase[]) => Promise<void>
}
export function Form({ keyParams, action } : FormProps) {
    const [name, setName ] = useState('');

    let { contains } = useFilter({ sensitivity: 'base' });

    const initialItems: ListData<M2KeyBase> = useListData({
        initialItems: [],
        getKey: (item: M2KeyBase) => item.id,
    });

    const items = useListData({
        initialItems: keyParams?.keys,
        getKey: (item) => item.id,
        filter: (item, filterText) => contains(item.name, filterText)
    });

    return (
        <FormBody action={async () => await action(name, initialItems.items)}>
            <Controls>
                <BackLink />
                <Button variant="primary" type="submit">
                    Create key
                </Button>
            </Controls>
            <Module title="M.2 key details" subtitle="Specify details for a new M.2 key.">
                <Content>
                    <Row>
                        <TextField label="Name" name="name" onChange={setName} grow isRequired />
                    </Row>
                </Content>
            </Module>
            <Module title="Compatible M.2 keys" subtitle="Specify which keys are compatible with this key.">
                <Content>
                    <ListBuilder initialItems={initialItems} items={items}>
                        <ListBuilderList<M2KeyBase>>
                            {item =><ListBuilderListItem>{item.name}<ListBuilderTrashButton /></ListBuilderListItem>}
                        </ListBuilderList>
                        <ListBuilderRow>
                            <ListBuilderComboBox<M2KeyBase>>
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