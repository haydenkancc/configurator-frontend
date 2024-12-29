import {ListData, useListData} from 'react-stately';
import {IO, Fan, Motherboard, GraphicsCard, PowerSupply} from '@/server/models/catalogue';
import {
    ListBuilder, ListBuilderAddButton, ListBuilderComboBox, ListBuilderComboBoxItem,
    ListBuilderList,
    ListBuilderListItem,
    ListBuilderRow,
    ListBuilderTrashButton
} from '@/components/ui/list-builder';
import {useFilter} from '@react-aria/i18n';
import {Row} from '@/components/catalogue/views/item-view';
import {Button} from '@/components/ui/button';
import {Plus, X} from '@phosphor-icons/react/dist/ssr';
import {TableBuilder, TableBuilderDeleteButton, TableBuilderRow} from '@/components/ui/table-builder';
import {ComboBox, ComboBoxItem} from '@/components/ui/combo-box';
import {NumberField} from '@/components/ui/number-field';
import {RecursiveMap, RecursiveNullable} from '@/server/models';
import {MutableRefObject, useCallback, useMemo, useState} from 'react';
import {Updater, useImmer} from 'use-immer';
import {enableMapSet, produce} from 'immer';

export function transformIOConnectorsDtoToMap(compatibleConnectors: IO.ConnectorDtoSimple[] | null) {
    const map: RecursiveMap<IO.ConnectorDtoSimple> = new Map();
    if (compatibleConnectors === null) {
        return map;
    }
    compatibleConnectors.map((connector) => {
        map.set(connector.id, connector);
    })
    return map;
}

export function transformIOConnectorsMapToDbo(compatibleConnectors: RecursiveMap<IO.ConnectorDtoSimple>) {
    const arr : number[] = [];
    for (const connector of compatibleConnectors) {
        arr.push(connector[1].id);
    }
    return arr;
}

interface IOConnectorsListBuilderProps {
    compatibleConnectors: RecursiveMap<IO.ConnectorDtoSimple>;
    setCompatibleConnectors: Updater<RecursiveMap<IO.ConnectorDtoSimple>>;
    connectors: IO.ConnectorDtoSimple[] | undefined;
    connectorID?: number;
}

enableMapSet();

export function IOConnectorsListBuilder({compatibleConnectors, setCompatibleConnectors, connectors, connectorID} : IOConnectorsListBuilderProps) {

    const [comboBoxItems, setComboBoxItems] = useImmer(() => {
        const map : Map<number, IO.ConnectorDtoSimple> = new Map();
        if (connectors) {
            for (const connector of connectors) {
                if (!(compatibleConnectors.has(connector.id) || connector.id === connectorID)) {
                    map.set(connector.id, connector)
                }
            }
        }
        return map;
    })

    const handleAdd = useCallback((key: number | null) => {
        if (key === null) { return; }

        const connector = comboBoxItems.get(key);

        console.log(connector);

        if (connector) {
            setCompatibleConnectors((draft) => {
                draft.set(key, connector)
            })
            setComboBoxItems((draft) => {
                draft.delete(key);
            })
        }

        console.log(compatibleConnectors);
    }, [comboBoxItems])

    const handleRemove = useCallback((key: number) => {
        const connector = compatibleConnectors.get(key);
        if (connector) {
            setComboBoxItems((draft) => {
                draft.set(key, connector)
            })
            setCompatibleConnectors((draft) => {
                draft.delete(key);
            })
        }
    }, [comboBoxItems]);

    return (
        <ListBuilder gridListItems={compatibleConnectors} comboBoxItems={comboBoxItems} handleAdd={handleAdd} handleRemove={handleRemove}>
            <ListBuilderList<[number, IO.ConnectorDtoSimple]>>
                {([key, item]) =><ListBuilderListItem id={key}>{item.name}<ListBuilderTrashButton /></ListBuilderListItem>}
            </ListBuilderList>
            <ListBuilderRow>
                <ListBuilderComboBox<[number, IO.ConnectorDtoSimple]>>
                    {([key, item]) =>
                        <ListBuilderComboBoxItem id={key}>
                            {item.name}
                        </ListBuilderComboBoxItem>
                    }
                </ListBuilderComboBox>
                <ListBuilderAddButton />
            </ListBuilderRow>
        </ListBuilder>
    )
}

interface IOConnectorsTableBuilderProps {
    configurationKey: number,
    compatibleConnectors: RecursiveMap<RecursiveNullable<GraphicsCard.ConfigurationConnectorDbo>>;
    addConnector: (configurationKey: number) => void;
    removeConnector: (configurationKey: number, connectorKey: number) => void;
    setConnectorID: (configurationKey: number, connectorKey: number, connectorID: number | null) => void;
    setConnectorCount: (configurationKey: number, connectorKey: number, count: number) => void;
    connectors: IO.ConnectorDtoSimple[] | undefined;
}

export function IOConnectorsTableBuilder({configurationKey, compatibleConnectors, addConnector, removeConnector, setConnectorID, setConnectorCount, connectors} : IOConnectorsTableBuilderProps) {
    return <>
        <TableBuilder items={compatibleConnectors} emptyState="Add a connector to get started">
            {([connectorKey, connector]) =>
                <TableBuilderRow id={connectorKey}>
                    <ComboBox
                        placeholder="Select a connector"
                        defaultItems={connectors}
                        grow isRequired
                        selectedKey={connector.connectorID}
                        onSelectionChange={(connectorID) => setConnectorID(configurationKey, connectorKey, connectorID)}>
                        {connector =>
                            <ComboBoxItem id={connector.id}>
                                {connector.name}
                            </ComboBoxItem>
                        }
                    </ComboBox>
                    <X weight="bold" />
                    <NumberField placeholder="..." grow isRequired value={connector.connectorCount} onChange={(count) => setConnectorCount(configurationKey, connectorKey, count)} />
                    <TableBuilderDeleteButton onPress={() => removeConnector(configurationKey, connectorKey)}/>
                </TableBuilderRow>
            }
        </TableBuilder>
        <Row justify="end">
            <Button variant="primary" onPress={() => addConnector(configurationKey)}>
                <Plus weight="bold"/>Add connector
            </Button>
        </Row>
    </>
}