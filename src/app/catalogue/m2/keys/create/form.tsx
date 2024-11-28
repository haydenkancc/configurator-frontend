'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import React, {useState} from 'react';
import {useFilter} from '@react-aria/i18n';
import {useListData} from 'react-stately';
import {PostFormProps} from '@/server/models'
import {M2KeyBase, M2KeyDbo, M2KeyParams} from '@/server/models/components';
import {M2KeysListBuilder} from '../fields';


export function Form({ action, params } : PostFormProps<M2KeyDbo, M2KeyParams>) {
    let { contains } = useFilter({ sensitivity: 'base' });

    const initialItems= useListData<M2KeyBase>({
        initialItems: [],
        getKey: (k) => k.id
    });

    const items = useListData({
        initialItems: params?.keys,
        getKey: (k) => k.id,
        filter: (k, filterText) => contains(k.name, filterText)
    });

    const [name, setName] = useState<string>()

    return (
        <PostBody name="key"
                 submitAction={async () => await action({ name, compatibleKeyIDs: initialItems.items.map(({ id }) => id) })}>
            <Module title="M.2 key details" subtitle="View and modify this M.2 key's details.">
                <Content>
                    <Row>
                        <TextField label="Name" name="name" value={name} onChange={setName} grow isRequired />
                    </Row>
                </Content>
            </Module>
            <Module title="Compatible M.2 keys" subtitle="Specify which keys are compatible with this key.">
                <Content>
                    <M2KeysListBuilder gridListItems={initialItems} comboBoxItems={items} />
                </Content>
            </Module>
        </PostBody>
    )
}