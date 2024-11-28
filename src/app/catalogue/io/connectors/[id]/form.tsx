'use client';
import {PutFormProps} from '@/server/models'
import {IOConnector, IOConnectorDbo, IOConnectorParams} from '@/server/models/components';
import {Content, Module, PutBody, Row} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import React, {useState} from 'react';
import {IOConnectorsListBuilder} from '../fields';
import {useFilter} from '@react-aria/i18n';
import {useListData} from 'react-stately';

export function Form({ item, action, params } : PutFormProps<IOConnector, IOConnectorDbo, IOConnectorParams>) {

    let { contains } = useFilter({ sensitivity: 'base' });

    const initialItems= useListData({
        initialItems: item?.compatibleConnectors,
        getKey: (k) => k.id
    });

    const items = useListData({
        initialItems: params?.connectors.filter(({ id }) => !(initialItems.getItem(id) || id === item?.id)),
        getKey: (k) => k.id,
        filter: (k, filterText) => contains(k.name, filterText)
    });

    const [name, setName] = useState(item?.name)

    return (
        <PutBody name="connector"
                 submitAction={async () => await action({ name, compatibleConnectorIDs: initialItems.items.map(({ id }) => id) })}>
            <Module title="I/O connector details" subtitle="View and modify this I/O connector's details.">
                <Content>
                    <Row>
                        <NumberField value={item?.id} label="ID" isReadOnly />
                        <TextField label="Name" name="name" value={name} onChange={setName} grow isRequired />
                    </Row>
                </Content>
            </Module>
            <Module title="Compatible I/O connectors" subtitle="Specify which connectors are compatible with this connector.">
                <Content>
                    <IOConnectorsListBuilder gridListItems={initialItems} comboBoxItems={items} />
                </Content>
            </Module>
        </PutBody>
    )
}