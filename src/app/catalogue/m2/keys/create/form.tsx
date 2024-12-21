'use client'
import {Content, Module, PostBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import { M2 } from '@/server/models/catalogue';
import {NumberField} from '@/components/ui/number-field';
import {M2KeysListBuilder} from '@/components/catalogue/views/forms';
import {useFilter} from '@react-aria/i18n';
import {useListData} from 'react-stately';

export function Form({action, params}: PostFormProps<M2.KeyDbo, M2.KeyParams>) {

    const [name, setName] = useState<string>("")

    const compatibleKeys= useListData<M2.KeyDtoSimple>({
        initialItems: [],
    });

    return (
        <PostBody name="key" submitAction={async () => await action({
            name: name,
            compatibleKeyIDs: compatibleKeys.items.map(({id}) => id),
        })}>
            <Module title="Key details" subtitle="View and modify this key's details.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                </Content>
            </Module>
            <Module title="Compatible keys" subtitle="Specify which keys are compatible with this key.">
                <Content>
                    <M2KeysListBuilder compatibleKeys={compatibleKeys} keys={params?.keys} />
                </Content>
            </Module>
        </PostBody>
    )
}