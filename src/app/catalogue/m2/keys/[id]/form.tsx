'use client';
import {PutFormProps} from '@/server/models'
import { M2 } from '@/server/models/catalogue';
import {Content, Module, PutBody, Row} from '@/components/catalogue/views/item-view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {useListData} from 'react-stately';
import {useFilter} from '@react-aria/i18n';
import {M2KeysListBuilder} from '@/components/catalogue/views/forms';

export function Form({item, action, params}: PutFormProps<M2.KeyDto, M2.KeyDbo, M2.KeyParams>) {

    const [name, setName] = useState<string>(item?.name ?? "")

    const compatibleKeys= useListData<M2.KeyDtoSimple>({
        initialItems: item?.compatibleKeys,
    });

    return (
        <PutBody name="key" submitAction={async () => await action({
            name: name,
            compatibleKeyIDs: compatibleKeys.items.map(({id}) => id)
        })}>
            <Module title="Key details" subtitle="View and modify this key's details.">
                <Content>
                    <Row>
                        <NumberField value={item?.id} label="ID" isReadOnly/>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                </Content>
            </Module>
            <Module title="Compatible keys" subtitle="Specify which keys are compatible with this key.">
                <Content>
                    <M2KeysListBuilder compatibleKeys={compatibleKeys} keys={params?.keys} keyID={item?.id} />
                </Content>
            </Module>
        </PutBody>
    )
}