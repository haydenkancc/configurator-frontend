import {ListData, useListData} from 'react-stately';
import {RecursiveNullable} from '@/server/models';
import {Row} from '@/components/catalogue/views/item-view';
import {Button} from '@/components/ui/button';
import {Minus, Plus, X} from '@phosphor-icons/react/dist/ssr';
import {TableBuilder, TableBuilderDeleteButton, TableBuilderRow} from '@/components/ui/table-builder';
import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import {NumberField} from '@/components/ui/number-field';
import {PowerSupply, Motherboard, IO} from '@/server/models/catalogue'
import {useFilter} from '@react-aria/i18n';
import {
    ListBuilder, ListBuilderAddButton, ListBuilderComboBox, ListBuilderComboBoxItem,
    ListBuilderList,
    ListBuilderListItem,
    ListBuilderRow,
    ListBuilderTrashButton
} from '@/components/ui/list-builder';


export function transformPowerSupplyConnectorsTableToDbo(rows: ListData<{ id: number } & RecursiveNullable<Motherboard.UnitPowerSupplyConnectorDbo>>) {
    return rows.items.map(({id, ...props}) => ({...props}))
}

export function transformPowerSupplyConnectorsDtoToDbo(rows: Motherboard.UnitPowerSupplyConnectorDto[] | null, rowIdRef: React.MutableRefObject<number>): ({id: number} & Motherboard.UnitPowerSupplyConnectorDbo)[] | undefined {
    return rows ? rows.map(({connector, connectorCount}) => ({ id: ++rowIdRef.current, connectorID: connector.id, connectorCount})) : undefined;
}

export function PowerSupplyConnectorsTableBuilder({ rows, rowIdRef, connectors } : { rows: ListData<{ id: number } & RecursiveNullable<Motherboard.UnitPowerSupplyConnectorDbo>>, connectors?: PowerSupply.ConnectorDtoSimple[], rowIdRef: React.MutableRefObject<number> }) {
    return (
        <>
            <Row justify="end">
                <Button variant="primary" onPress={() => rows.prepend({ id: rowIdRef.current++, connectorID: null, connectorCount: null, })}>
                    <Plus weight="bold"/>Add connector
                </Button>
            </Row>
            <TableBuilder items={rows.items} emptyState="Add a connector to get started">
                {item =>
                    <TableBuilderRow id={item.id}>
                        <PowerSupplyConnectorComboBox
                            label=""
                            defaultItems={connectors}
                            selectedKey={item.connectorID}
                            onSelectionChange={(connectorID) => rows.update(item.id, { id: item.id, connectorCount: item.connectorCount, connectorID: connectorID})}>
                            {connector =>
                                <ComboBoxItem id={connector.id}>
                                    {connector.name}
                                </ComboBoxItem>
                            }
                        </PowerSupplyConnectorComboBox>
                        <X weight="bold" />
                        <NumberField placeholder="..." grow isRequired value={item.connectorCount} onChange={(value) => rows.update(item.id, {...item, connectorCount: value})} />
                        <TableBuilderDeleteButton onPress={() => rows.remove(item.id)}/>
                    </TableBuilderRow>
                }
            </TableBuilder>
        </>
    )
}

export function transformPowerSupplyUnitConnectorsTableToDbo(rows: ListData<{ id: number } & RecursiveNullable<PowerSupply.UnitConnectorDbo>>) {
    return rows.items.map(({id, ...props}) => ({...props}))
}

export function transformPowerSupplyUnitConnectorsDtoToDbo(rows: PowerSupply.UnitConnectorDto[] | null, rowIdRef: React.MutableRefObject<number>): ({id: number} & PowerSupply.UnitConnectorDbo)[] | undefined {
    return rows ? rows.map(({connector, ...props}) => ({ id: ++rowIdRef.current, connectorID: connector.id, ...props})) : undefined;
}

export function PowerSupplyUnitConnectorsTableBuilder({ rows, rowIdRef, connectors } : { rows: ListData<{ id: number } & RecursiveNullable<PowerSupply.UnitConnectorDbo>>, connectors?: PowerSupply.ConnectorDtoSimple[], rowIdRef: React.MutableRefObject<number> }) {
    return (
        <>
            <Row justify="end">
                <Button variant="primary" onPress={() => rows.prepend({ id: rowIdRef.current++, connectorID: null, connectorCount: null, splitCount: null })}>
                    <Plus weight="bold"/>Add connector
                </Button>
            </Row>
            <TableBuilder items={rows.items} emptyState="Add a connector to get started">
                {item =>
                    <TableBuilderRow id={item.id}>
                        <NumberField isRequired placeholder="..." value={item.splitCount} onChange={(value) => rows.update(item.id, {...item, splitCount: value})}/>
                        <Minus weight="bold" />
                        <PowerSupplyConnectorComboBox
                            label=""
                            defaultItems={connectors}
                            selectedKey={item.connectorID}
                            onSelectionChange={(connectorID) => rows.update(item.id, { ...item, connectorID: connectorID})}>
                            {connector =>
                                <ComboBoxItem id={connector.id}>
                                    {connector.name}
                                </ComboBoxItem>
                            }
                        </PowerSupplyConnectorComboBox>
                        <X weight="bold" />
                        <NumberField placeholder="..." grow isRequired value={item.connectorCount} onChange={(value) => rows.update(item.id, {...item, connectorCount: value})} />
                        <TableBuilderDeleteButton onPress={() => rows.remove(item.id)}/>
                    </TableBuilderRow>
                }
            </TableBuilder>
        </>
    )
}

export function PowerSupplyConnectorComboBox({...props} : ComboBoxProps<PowerSupply.ConnectorDtoSimple>) {
    return (
        <ComboBox label="Connector" placeholder="Select a connector" isRequired grow {...props}>
            {connector => <ComboBoxItem id={connector.id}>{connector.name}</ComboBoxItem>}
        </ComboBox>
    )
}


export function PowerSupplyEfficiencyRatingComboBox({...props } : ComboBoxProps<PowerSupply.EfficiencyRatingDto>) {
    return (
        <ComboBox label="Efficiency rating" isRequired {...props}>
            {efficiencyRating => (
                <ComboBoxItem>{efficiencyRating.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function PowerSupplyModularityComboBox({...props } : ComboBoxProps<PowerSupply.ModularityDto>) {
    return (
        <ComboBox label="Modularity" isRequired {...props}>
            {modularity => (
                <ComboBoxItem>{modularity.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function PowerSupplyFormFactorComboBox({...props } : ComboBoxProps<PowerSupply.FormFactorDto>) {
    return (
        <ComboBox label="Form factor" isRequired {...props}>
            {formFactor => (
                <ComboBoxItem>{formFactor.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function PowerSupplyConnectorsListBuilder({compatibleConnectors, connectors, connectorID} : { compatibleConnectors : ListData<PowerSupply.ConnectorDtoSimple>, connectors?: PowerSupply.ConnectorDtoSimple[], connectorID?: number }) {

    let { contains } = useFilter({ sensitivity: 'base' });

    const comboBoxItems = useListData({
        initialItems: connectors?.filter((({ id }) => !(compatibleConnectors.getItem(id) || id === connectorID))),
        filter: (k, filterText) => contains(k.name, filterText)
    });


    return (
        <ListBuilder gridListItems={compatibleConnectors} comboBoxItems={comboBoxItems}>
            <ListBuilderList<PowerSupply.ConnectorDtoSimple>>
                {item =><ListBuilderListItem>{item.name}<ListBuilderTrashButton /></ListBuilderListItem>}
            </ListBuilderList>
            <ListBuilderRow>
                <ListBuilderComboBox<PowerSupply.ConnectorDtoSimple>>
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