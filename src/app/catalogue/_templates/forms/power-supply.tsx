import {ListData} from 'react-stately';
import {
    GraphicsProcessorChipset,
    IOConnectorBase, MotherboardUnitPowerSupplyConnector, PowerSupplyConnector,
    PowerSupplyConnectorBase,
    PowerSupplyUnitConnector,
    PowerSupplyUnitParams
} from '@/server/models/components';
import {
    ListBuilder, ListBuilderAddButton, ListBuilderComboBox, ListBuilderComboBoxItem,
    ListBuilderList,
    ListBuilderListItem,
    ListBuilderRow,
    ListBuilderTrashButton
} from '@/components/ui/list-builder';
import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import React from 'react';
import {Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import {Minus, Plus, X} from '@phosphor-icons/react/dist/ssr';
import {TableBuilder, TableBuilderDeleteButton, TableBuilderRow} from '@/components/ui/table-builder';
import {NumberField} from '@/components/ui/number-field';

export function PowerSupplyConnectorsListBuilder({ gridListItems, comboBoxItems } : { gridListItems : ListData<PowerSupplyConnectorBase>, comboBoxItems : ListData<PowerSupplyConnectorBase> }) {
    return (
        <ListBuilder gridListItems={gridListItems} comboBoxItems={comboBoxItems}>
            <ListBuilderList<PowerSupplyConnectorBase>>
                {item =><ListBuilderListItem>{item.name}<ListBuilderTrashButton /></ListBuilderListItem>}
            </ListBuilderList>
            <ListBuilderRow>
                <ListBuilderComboBox<PowerSupplyConnectorBase>>
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

export function PowerSupplyEfficiencyRatingComboBox({...props } : ComboBoxProps<PowerSupplyUnitParams["efficiencyRatings"][number]>) {
    return (
        <ComboBox label="Efficiency rating" isRequired {...props}>
            {efficiencyRating => (
                <ComboBoxItem>{efficiencyRating.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function PowerSupplyModularityComboBox({...props } : ComboBoxProps<PowerSupplyUnitParams["modularities"][number]>) {
    return (
        <ComboBox label="Modularity" isRequired {...props}>
            {modularity => (
                <ComboBoxItem>{modularity.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function PowerSupplyFormFactorComboBox({...props } : ComboBoxProps<PowerSupplyUnitParams["formFactors"][number]>) {
    return (
        <ComboBox label="Form factor" isRequired {...props}>
            {formFactor => (
                <ComboBoxItem>{formFactor.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function PowerSupplyUnitConnectorsTableBuilder({ rows, rowIdRef, connectors } : { rows: ListData<{ id: number } & Partial<PowerSupplyUnitConnector>>, connectors?: IOConnectorBase[], rowIdRef: React.MutableRefObject<number> }) {

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
                        <NumberField isRequired placeholder="..." value={item.splitCount} onChange={(value) => rows.update(item.id, {...item, splitCount: value})}/>
                        <Minus weight="bold" />
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
                        <NumberField placeholder="..." isRequired value={item.connectorCount} onChange={(value) => rows.update(item.id, {...item, connectorCount: value})} />
                        <TableBuilderDeleteButton onPress={() => rows.remove(item.id)}/>
                    </TableBuilderRow>
                }
            </TableBuilder>
        </>
    )
}

export function PowerSupplyConnectorsTableBuilder({ rows, rowIdRef, connectors } : { rows: ListData<{ id: number } & Partial<MotherboardUnitPowerSupplyConnector>>, connectors?: IOConnectorBase[], rowIdRef: React.MutableRefObject<number> }) {

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

export function PowerSupplyConnectorComboBox({...props } : ComboBoxProps<PowerSupplyConnectorBase>) {
    return (
        <ComboBox placeholder="Select a connector" isRequired {...props}>
            {connector => (
                <ComboBoxItem>{connector.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}
