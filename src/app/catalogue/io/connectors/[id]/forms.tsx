'use client'
import {IOConnector, IOConnectorBase, IOConnectorParams} from '@/server/models';
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

interface ConnectorsProps {
    ioConnector: IOConnector;
    connectorParams: IOConnectorParams | undefined;
    action: (Connectors: IOConnectorBase[]) => Promise<void>;
}

export function Connectors({ioConnector, connectorParams, action} : ConnectorsProps) {

    let { contains } = useFilter({ sensitivity: 'base' });

    const initialItems= useListData({
        initialItems: ioConnector.compatibleConnectors,
        getKey: (item) => item.id
    });

    const items = useListData({
        initialItems: connectorParams?.connectors.filter(({ id }) => !(initialItems.getItem(id) || id === ioConnector.id)),
        getKey: (item) => item.id,
        filter: (item, filterText) => contains(item.name, filterText)
    });

    return (
        <FormModule title="Compatible I/O Connectors" subtitle="Specify which Connectors are compatible with this Connector." action={async () => await action(initialItems.items)}>
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
    ioConnector: IOConnector;
    action: (name: string) => Promise<void>;
}

export function Details({ioConnector, action} : DetailsProps) {

    const [name, setName] = useState(ioConnector.name)


    return (
        <FormModule title="I/O Connector details" subtitle="View and modify this I/O Connector's details." action={async () => await action(name)}>
            <Content>
                <Row>
                    <NumberField value={ioConnector.id} label="ID" isReadOnly />
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