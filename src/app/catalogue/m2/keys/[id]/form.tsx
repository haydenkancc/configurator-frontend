'use client';
import {PutFormProps} from '@/server/models'
import {M2Key, M2KeyDbo, M2KeyParams} from '@/server/models/components';
import {Content, Module, PutBody, Row} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import React, {useState} from 'react';
import {M2KeysListBuilder} from '../fields';
import {useFilter} from '@react-aria/i18n';
import {useListData} from 'react-stately';

export function Form({ item, action, params } : PutFormProps<M2Key, M2KeyDbo, M2KeyParams>) {

    let { contains } = useFilter({ sensitivity: 'base' });

    const initialItems= useListData({
        initialItems: item?.compatibleKeys,
        getKey: (k) => k.id
    });

    const items = useListData({
        initialItems: params?.keys.filter(({ id }) => !(initialItems.getItem(id) || id === item?.id)),
        getKey: (k) => k.id,
        filter: (k, filterText) => contains(k.name, filterText)
    });

    const [name, setName] = useState(item?.name)

    return (
        <PutBody name="key"
                 submitAction={async () => await action({ name, compatibleKeyIDs: initialItems.items.map(({ id }) => id) })}>
            <Module title="M.2 key details" subtitle="View and modify this M.2 key's details.">
                <Content>
                    <Row>
                        <NumberField value={item?.id} label="ID" isReadOnly />
                        <TextField label="Name" name="name" value={name} onChange={setName} grow isRequired />
                    </Row>
                </Content>
            </Module>
            <Module title="Compatible M.2 keys" subtitle="Specify which keys are compatible with this key.">
                <Content>
                    <M2KeysListBuilder gridListItems={initialItems} comboBoxItems={items} />
                </Content>
            </Module>
        </PutBody>
    )
}