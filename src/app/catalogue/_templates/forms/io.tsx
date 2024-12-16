import {ListData} from 'react-stately';
import {FanPackIOConnector, IOConnector, IOConnectorBase} from '@/server/models/components';
import React from 'react';
import {Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import {Plus, X} from '@phosphor-icons/react/dist/ssr';
import {TableBuilder, TableBuilderDeleteButton, TableBuilderRow} from '@/components/ui/table-builder';
import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import {NumberField} from '@/components/ui/number-field';
import {
    ListBuilder, ListBuilderAddButton, ListBuilderComboBox, ListBuilderComboBoxItem,
    ListBuilderList,
    ListBuilderListItem,
    ListBuilderRow,
    ListBuilderTrashButton
} from '@/components/ui/list-builder';

export function IOConnectorsTableBuilder({ rows, rowIdRef, connectors } : { rows: ListData<{ id: number } & Partial<FanPackIOConnector>>, connectors?: IOConnectorBase[], rowIdRef: React.MutableRefObject<number> }) {

    return (
        <>
            <Row justify="end">
                <Button variant="primary" onPress={() => rows.prepend({ id: rowIdRef.current++ })}>
                    <Plus weight="bold"/>Add connector
                </Button>
            </Row>
            <TableBuilder items={rows.items} emptyState="Add a connector to get started">
                {item =>
                    <TableBuilderRow id={item.id}>
                        <ComboBox
                            placeholder="Select a connector"
                            defaultItems={connectors}
                            grow isRequired
                            selectedKey={item.connectorID}
                            onSelectionChange={(connectorID) => rows.update(item.id, { id: item.id, connectorCount: item.connectorCount, connectorID: connectorID as number })}>
                            {connector =>
                                <ComboBoxItem id={connector.id}>
                                    {connector.name}
                                </ComboBoxItem>
                            }
                        </ComboBox>
                        <X weight="bold" />
                        <NumberField placeholder="..." grow isRequired value={item.connectorCount} onChange={(value) => rows.update(item.id, {...item, connectorCount: value})} />
                        <TableBuilderDeleteButton onPress={() => rows.remove(item.id)}/>
                    </TableBuilderRow>
                }
            </TableBuilder>
        </>
    )
}

export function IOConnectorsListBuilder({ gridListItems, comboBoxItems } : { gridListItems : ListData<IOConnectorBase>, comboBoxItems : ListData<IOConnectorBase> }) {
    return (
        <ListBuilder gridListItems={gridListItems} comboBoxItems={comboBoxItems}>
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
    )
}

export function IOConnectorComboBox({ ...props} : ComboBoxProps<IOConnectorBase>)
{
    return (
        <ComboBox placeholder="Select a connector" label="Connector" isRequired {...props}>
            {connector => <ComboBoxItem>{connector.name}</ComboBoxItem>}
        </ComboBox>
    )
}