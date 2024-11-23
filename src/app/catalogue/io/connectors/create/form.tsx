'use client'
import {BackLink, Content, Controls, FormBody, Module, Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import {TextField} from '@/components/ui/text-field';
import React, {useState} from 'react';
import {useFilter} from '@react-aria/i18n';
import {ListData, useListData} from 'react-stately';
import {IOConnector, IOConnectorBase, IOConnectorParams} from '@/server/models';
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
    connectorParams: IOConnectorParams | undefined;
    action: (name: string, compatibleConnectors: IOConnectorBase[]) => Promise<void>
}
export function Form({ connectorParams, action } : FormProps) {
    const [name, setName ] = useState('');

    let { contains } = useFilter({ sensitivity: 'base' });

    const initialItems: ListData<IOConnectorBase> = useListData({
        initialItems: [],
        getKey: (item: IOConnectorBase) => item.id,
    });

    const items = useListData({
        initialItems: connectorParams?.connectors,
        getKey: (item) => item.id,
        filter: (item, filterText) => contains(item.name, filterText)
    });

    return (
        <FormBody action={async () => await action(name, initialItems.items)}>
            <Controls>
                <BackLink />
                <Button variant="primary" type="submit">
                    Create connector
                </Button>
            </Controls>
            <Module title="I/O connector details" subtitle="Specify details for a new I/O connector.">
                <Content>
                    <Row>
                        <TextField label="Name" name="name" onChange={setName} grow isRequired />
                    </Row>
                </Content>
            </Module>
            <Module title="Compatible I/O connectors" subtitle="Specify which connectors are compatible with this connector.">
                <Content>
                    <ListBuilder initialItems={initialItems} items={items}>
                        <ListBuilderList<IOConnectorBase>>
                            {item =><ListBuilderListItem>{item.name}<ListBuilderTrashButton /></ListBuilderListItem>}
                        </ListBuilderList>
                        <ListBuilderRow>
                            <ListBuilderComboBox<IOConnectorBase>>
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