'use client'
import {BackLink, Content, Controls, Module, PostBody, PutBody, Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import {TextField} from '@/components/ui/text-field';
import React, {useState} from 'react';
import {useFilter} from '@react-aria/i18n';
import {ListData, useListData} from 'react-stately';
import {M2Key, M2KeyBase, M2KeyDbo, M2KeyParams, PostFormProps} from '@/server/models';
import {M2KeysListBuilder} from '@/app/catalogue/m2/keys/fields';
import {NumberField} from '@/components/ui/number-field';


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
        <PostBody name="bracket"
                 submitAction={async () => await action({ name, compatibleKeyIDs: initialItems.items.map(({ id }) => id) })}>
            <Module title="PCIe bracket details" subtitle="View and modify this PCIe bracket's details.">
                <Content>
                    <Row>
                        <TextField label="Name" name="name" value={name} onChange={setName} grow isRequired />
                    </Row>
                </Content>
            </Module>
            <Module title="Compatible M.2 keys" subtitle="Specify which keys are compatible with this key.">
                <Content>
                    <M2KeysListBuilder initialItems={initialItems} items={items} />
                </Content>
            </Module>
        </PostBody>
    )
}