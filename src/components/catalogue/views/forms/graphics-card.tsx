import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import {GraphicsCard, IO, PowerSupply} from '@/server/models/catalogue';
import {ListData, useListData} from 'react-stately';
import {NumberField} from '@/components/ui/number-field';
import {Row} from '@/components/catalogue/views/item-view';
import {Button} from '@/components/ui/button';
import {CaretDown, Plus, TrashSimple, X} from '@phosphor-icons/react/dist/ssr';
import {Updater, useImmer} from 'use-immer';
import {MutableRefObject, useCallback, useRef} from 'react';
import s from './a.module.scss';
import {RecursiveMap, RecursiveNullable} from '@/server/models';
import {
    ListBuilder, ListBuilderAddButton, ListBuilderComboBox, ListBuilderComboBoxItem,
    ListBuilderList,
    ListBuilderListItem,
    ListBuilderRow,
    ListBuilderTrashButton
} from '@/components/ui/list-builder';
import {TableBuilder, TableBuilderDeleteButton, TableBuilderRow} from '@/components/ui/table-builder';
import {WritableDraft} from 'immer';
import {CaretRight} from '@phosphor-icons/react';
import {
    Disclosure,
    DisclosureGroup,
    DisclosurePanel,
    Heading,
    TrashButton,
    TriggerButton
} from '@/components/ui/tree-builder';
import {Collection} from 'react-aria-components';

export function GraphicsCardChipsetComboBox({...props } : ComboBoxProps<GraphicsCard.ChipsetDto>) {
    return (
        <ComboBox grow label="Chipset" isRequired {...props}>
            {chipset => (
                <ComboBoxItem>{chipset.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function transformGraphicsCardConfigurationsDtoToMap(configurations: RecursiveNullable<GraphicsCard.ConfigurationDto[]> | null, counterRef1: MutableRefObject<number>, counterRef2: MutableRefObject<number>) : RecursiveMap<RecursiveNullable<GraphicsCard.ConfigurationDbo>> {
    const map : RecursiveMap<RecursiveNullable<GraphicsCard.ConfigurationDbo>> = new Map();

    if (configurations === null) {
        return map;
    }

    configurations.map((configuration) => {
        const connectors : RecursiveMap<RecursiveNullable<GraphicsCard.ConfigurationConnectorDbo>> = new Map();
        configuration.connectors.map(({connector, connectorCount}) => {
            connectors.set(++counterRef2.current, {connectorID: connector.id, connectorCount: connectorCount})
        })
        map.set(++counterRef1.current, {connectors: connectors})
    })

    return map;
}

export function transformGraphicsCardConfigurationsMapToDbo(configurations: RecursiveMap<RecursiveNullable<GraphicsCard.ConfigurationDbo>>): RecursiveNullable<GraphicsCard.ConfigurationDbo[]> {
    const arr : RecursiveNullable<GraphicsCard.ConfigurationDbo>[] = [];
    for (const configuration of configurations.values()) {
        const connectors : RecursiveNullable<GraphicsCard.ConfigurationConnectorDbo>[] = [];
        for (const connector of configuration.connectors.values()) {
            connectors.push(connector)
        }
        arr.push({connectors: connectors});
    }
    return arr;
}


interface GraphicsCardPowerConnectorConfigurationsTreeBuilderProps {
    counterRef1: MutableRefObject<number>;
    counterRef2: MutableRefObject<number>;
    configurations: RecursiveMap<RecursiveNullable<GraphicsCard.ConfigurationDbo>>
    setConfigurations: Updater<RecursiveMap<RecursiveNullable<GraphicsCard.ConfigurationDbo>>>
    connectors: PowerSupply.ConnectorDtoSimple[] | undefined;
}


export function GraphicsCardPowerConnectorConfigurationsTreeBuilder({counterRef1, counterRef2, configurations, setConfigurations, connectors} : GraphicsCardPowerConnectorConfigurationsTreeBuilderProps) {

    const handleAddConfiguration = useCallback(() => {
        setConfigurations((draft) => {
            draft.set(++counterRef1.current, {
                connectors: new Map()
            });
        });
    }, []);

    const handleAddConnector = useCallback((configurationKey: number) => {
        setConfigurations((draft) => {
            draft.get(configurationKey)?.connectors.set(++counterRef2.current, {
                connectorID: null,
                connectorCount: null,
            })
        })
    }, [])

    const handleRemoveConfiguration = useCallback((configurationKey: number) => {
        setConfigurations((draft) => {
            draft.delete(configurationKey);
        });
    }, [])

    const handleRemoveConnector = useCallback((configurationKey: number, connectorKey: number) => {
        setConfigurations((draft) => {
            draft.get(configurationKey)?.connectors.delete(connectorKey);
        })
    }, [])

    const handleSetConnectorID = useCallback((configurationKey: number, connectorKey: number, connectorID: number | null) => {
        setConfigurations((draft) => {
            if (draft.get(configurationKey)?.connectors.has(connectorKey)) {
                draft.get(configurationKey)!.connectors.get(connectorKey)!.connectorID = connectorID;
            }
        })
    }, [])

    const handleSetConnectorCount = useCallback((configurationKey: number, connectorKey: number, count: number) => {
        setConfigurations((draft) => {
            if (draft.get(configurationKey)?.connectors.has(connectorKey)) {
                draft.get(configurationKey)!.connectors.get(connectorKey)!.connectorCount = count;
            }
        })
    }, [])

    return <>
        <DisclosureGroup allowsMultipleExpanded>
            <Collection items={configurations}>
                {([configurationKey, configuration]) => (
                    <Disclosure defaultExpanded={false} id={configurationKey}>
                        {({isExpanded}) => <>
                            <Heading >
                                <TriggerButton>
                                    {isExpanded ? <CaretDown weight="bold"/> : <CaretRight weight="bold" />}
                                    Configuration {configurationKey}
                                </TriggerButton>
                                <TrashButton onPress={() => handleRemoveConfiguration(configurationKey)}>
                                    <TrashSimple weight="fill" />
                                </TrashButton>
                            </Heading>
                            <DisclosurePanel>
                                <GraphicsCardPowerSupplyConnectorsTableBuilder
                                    configurationKey={configurationKey}
                                    compatibleConnectors={configuration.connectors}
                                    addConnector={handleAddConnector}
                                    removeConnector={handleRemoveConnector}
                                    setConnectorID={handleSetConnectorID}
                                    setConnectorCount={handleSetConnectorCount}
                                    connectors={connectors}
                                />
                            </DisclosurePanel>
                        </>}
                    </Disclosure>
                )}
            </Collection>
        </DisclosureGroup>
        <Row justify="center">
            <Button variant="primary" onPress={() => {handleAddConfiguration()}}><Plus weight="bold" />Add new configuration</Button>
        </Row>
    </>
}

interface GraphicsCardPowerSupplyConnectorsTableBuilderProps {
    configurationKey: number,
    compatibleConnectors: RecursiveMap<RecursiveNullable<GraphicsCard.ConfigurationConnectorDbo>>;
    addConnector: (configurationKey: number) => void;
    removeConnector: (configurationKey: number, connectorKey: number) => void;
    setConnectorID: (configurationKey: number, connectorKey: number, connectorID: number | null) => void;
    setConnectorCount: (configurationKey: number, connectorKey: number, count: number) => void;
    connectors: PowerSupply.ConnectorDtoSimple[] | undefined;
}

export function GraphicsCardPowerSupplyConnectorsTableBuilder({configurationKey, compatibleConnectors, addConnector, removeConnector, setConnectorID, setConnectorCount, connectors} : GraphicsCardPowerSupplyConnectorsTableBuilderProps) {
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

