'use client';
import {M2Key, M2KeyDbo, M2KeyParams, PCIeBracket, PCIeBracketDbo, PutFormProps} from '@/server/models';
import {Content, Footer, Module, Row, Controls, BackLink, PutBody} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {Button} from '@/components/ui/button';
import React, {useState} from 'react';
import {M2KeysListBuilder} from '@/app/catalogue/m2/keys/fields';
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
        <PutBody name="bracket"
                 submitAction={async () => await action({ name, compatibleKeyIDs: initialItems.items.map(({ id }) => id) })}>
            <Module title="PCIe bracket details" subtitle="View and modify this PCIe bracket's details.">
                <Content>
                    <Row>
                        <NumberField value={item?.id} label="ID" isReadOnly />
                        <TextField label="Name" name="name" value={name} onChange={setName} grow isRequired />
                    </Row>
                </Content>
            </Module>
            <Module title="Compatible M.2 keys" subtitle="Specify which keys are compatible with this key.">
                <Content>
                    <M2KeysListBuilder initialItems={initialItems} items={items} />
                </Content>
            </Module>
        </PutBody>
    )
}