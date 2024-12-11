'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import React, {useState} from 'react';
import {useFilter} from '@react-aria/i18n';
import {useListData} from 'react-stately';
import {PostFormProps} from '@/server/models'
import {PowerSupplyConnectorBase, PowerSupplyConnectorDbo, PowerSupplyConnectorParams} from '@/server/models/components';
import {PowerSupplyConnectorsListBuilder} from '@/app/catalogue/_templates/forms';


export function Form({ action, params } : PostFormProps<PowerSupplyConnectorDbo, PowerSupplyConnectorParams>) {
    let { contains } = useFilter({ sensitivity: 'base' });

    const initialItems= useListData<PowerSupplyConnectorBase>({
        initialItems: [],
        getKey: (k) => k.id
    });

    const items = useListData({
        initialItems: params?.connectors,
        getKey: (k) => k.id,
        filter: (k, filterText) => contains(k.name, filterText)
    });

    const [name, setName] = useState<string>()

    return (
        <PostBody name="connector"
                 submitAction={async () => await action({ name, compatibleConnectorIDs: initialItems.items.map(({ id }) => id) })}>
            <Module title="Power supply connector details" subtitle="View and modify this I/O connector's details.">
                <Content>
                    <Row>
                        <TextField label="Name" name="name" value={name} onChange={setName} grow isRequired />
                    </Row>
                </Content>
            </Module>
            <Module title="Compatible I/O connectors" subtitle="Specify which connectors are compatible with this connector.">
                <Content>
                    <PowerSupplyConnectorsListBuilder gridListItems={initialItems} comboBoxItems={items} />
                </Content>
            </Module>
        </PostBody>
    )
}