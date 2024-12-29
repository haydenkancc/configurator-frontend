import {ListData, useListData} from 'react-stately';
import {RecursiveMap, RecursiveNullable} from '@/server/models';
import {Row} from '@/components/catalogue/views/item-view';
import {Button} from '@/components/ui/button';
import {Minus, Plus, X} from '@phosphor-icons/react/dist/ssr';
import {TableBuilder, TableBuilderDeleteButton, TableBuilderRow} from '@/components/ui/table-builder';
import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import {NumberField} from '@/components/ui/number-field';
import {PowerSupply, Motherboard, IO, GraphicsCard} from '@/server/models/catalogue';





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

