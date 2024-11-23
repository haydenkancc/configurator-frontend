'use client'
import {M2Key, M2KeyBase, M2KeyParams} from '@/server/models';
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

interface KeysProps {
    m2key: M2Key;
    keyParams: M2KeyParams | undefined;
    action: (keys: M2KeyBase[]) => Promise<void>;
}

export function Keys({m2key, keyParams, action} : KeysProps) {

    let { contains } = useFilter({ sensitivity: 'base' });

    const initialItems= useListData({
        initialItems: m2key.compatibleKeys,
        getKey: (item) => item.id
    });

    const items = useListData({
        initialItems: keyParams?.keys.filter(({ id }) => !(initialItems.getItem(id) || id === m2key.id)),
        getKey: (item) => item.id,
        filter: (item, filterText) => contains(item.name, filterText)
    });

    return (
        <FormModule title="Compatible M.2 keys" subtitle="Specify which keys are compatible with this key." action={async () => await action(initialItems.items)}>
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
    m2key: M2Key;
    action: (name: string) => Promise<void>;
}

export function Details({m2key, action} : DetailsProps) {

    const [name, setName] = useState(m2key.name)


    return (
        <FormModule title="M.2 key details" subtitle="View and modify this M.2 key's details." action={async () => await action(name)}>
            <Content>
                <Row>
                    <NumberField value={m2key.id} label="ID" isReadOnly />
                    <TextField label="Name" name="name" value={name} onChange={setName} grow isRequired />
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