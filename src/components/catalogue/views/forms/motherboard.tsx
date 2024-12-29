import {RecursiveMap, RecursiveNullable, RecursiveNullableNoIterable} from '@/server/models';
import {memo, MutableRefObject, useCallback, useRef} from 'react';
import {GraphicsCard, M2, Motherboard, PowerSupply, CentralProcessor, IO, Pcie} from '@/server/models/catalogue';
import {TableBuilder, TableBuilderDeleteButton, TableBuilderRow} from '@/components/ui/table-builder';
import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import {CaretDown, Plus, TrashSimple, X} from '@phosphor-icons/react/dist/ssr';
import {NumberField} from '@/components/ui/number-field';
import {Row} from '@/components/catalogue/views/item-view';
import {Button} from '@/components/ui/button';
import {Updater, useImmer} from 'use-immer';
import {
    Disclosure,
    DisclosureGroup,
    DisclosurePanel,
    Heading,
    TrashButton,
    TriggerButton
} from '@/components/ui/tree-builder';
import {Collection} from 'react-aria-components';
import {CaretRight, ExclamationMark} from '@phosphor-icons/react';
import {GraphicsCardPowerSupplyConnectorsTableBuilder} from '@/components/catalogue/views/forms/graphics-card';
import {
    ListBuilder,
    ListBuilderAddButton,
    ListBuilderComboBox, ListBuilderComboBoxItem,
    ListBuilderList,
    ListBuilderListItem,
    ListBuilderRow,
    ListBuilderTrashButton
} from '@/components/ui/list-builder';

export function MotherboardChipsetComboBox({...props} : ComboBoxProps<Motherboard.ChipsetDtoSimple>) {
    return (
        <ComboBox isRequired grow placeholder="Select a chipset" label="Chipset" {...props}>
            {chipset => <ComboBoxItem>{chipset.name}</ComboBoxItem>}
        </ComboBox>
    )
}

export function MotherboardFormFactorComboBox({...props} : ComboBoxProps<Motherboard.FormFactorDto>) {
    return (
        <ComboBox isRequired grow placeholder="Select a form factor" label="Form factor" {...props}>
            {formFactor => <ComboBoxItem>{formFactor.name}</ComboBoxItem>}
        </ComboBox>
    )
}

export function transformMotherboardPowerSupplyConnectorsDtoToMap(connectors: RecursiveNullable<Motherboard.UnitPowerSupplyConnectorDto[]> | null, counterRef: MutableRefObject<number>) {
    const map : RecursiveMap<RecursiveNullable<Motherboard.UnitPowerSupplyConnectorDbo>> = new Map();

    connectors?.map(({connector, connectorCount}) => {
        map.set(++counterRef.current, {connectorID: connector.id, connectorCount: connectorCount})
    })

    return map;
}

export function transformMotherboardPowerSupplyConnectorsMapToDbo(connectors: RecursiveMap<RecursiveNullable<Motherboard.UnitPowerSupplyConnectorDbo>>) {
    const arr : RecursiveNullable<Motherboard.UnitPowerSupplyConnectorDbo>[] = [];

    for (const connector of connectors.values()) {
        arr.push(connector);
    }

    return arr;
}

export function transformMotherboardIOConnectorsDtoToMap(connectors: RecursiveNullable<Motherboard.UnitIOConnectorDto[]> | null, counterRef: MutableRefObject<number>) {
    const map : RecursiveMap<RecursiveNullable<Motherboard.UnitIOConnectorDbo>> = new Map();

    connectors?.map(({connector, connectorCount}) => {
        map.set(++counterRef.current, {connectorID: connector.id, connectorCount: connectorCount})
    })

    return map;
}

export function transformMotherboardIOConnectorsMapToDbo(connectors: RecursiveMap<RecursiveNullable<Motherboard.UnitIOConnectorDbo>>) {
    const arr : RecursiveNullable<Motherboard.UnitIOConnectorDbo>[] = [];

    for (const connector of connectors.values()) {
        arr.push(connector);
    }

    return arr;
}

interface MotherboardPowerSupplyConnectorsTableBuilderProps {
    compatibleConnectors: RecursiveMap<RecursiveNullable<Motherboard.UnitPowerSupplyConnectorDbo>>;
    setCompatibleConnectors: Updater<RecursiveMap<RecursiveNullable<Motherboard.UnitPowerSupplyConnectorDbo>>>
    connectors: PowerSupply.ConnectorDtoSimple[] | undefined;
    counterRef: MutableRefObject<number>;
}

export function MotherboardConnectorsTableBuilder({compatibleConnectors, setCompatibleConnectors, connectors, counterRef} : MotherboardPowerSupplyConnectorsTableBuilderProps) {

    const [comboBoxItems, setComboBoxItems] = useImmer(() => {
        const map : Map<number, PowerSupply.ConnectorDtoSimple> = new Map();
        if (connectors) {
            for (const connector of connectors) {
                if (!(compatibleConnectors.has(connector.id))) {
                    map.set(connector.id, connector)
                }
            }
        }
        return map;
    })
    const handleAddConnector = useCallback(() => {
        setCompatibleConnectors((draft) => {
            draft.set(++counterRef.current, {connectorID: null, connectorCount: null})
        })
    }, [])

    const handleRemoveConnector = useCallback((key: number) => {
        setCompatibleConnectors((draft) => {
            draft.delete(key)
        })
    }, [])

    const handleSetConnectorID = useCallback((key: number, connectorID: number | null) => {
        setCompatibleConnectors((draft) => {
            const connector = draft.get(key)
            if (connector) {
                connector.connectorID = connectorID;
            }
        })
    }, [])

    const handleSetConnectorCount = useCallback((key: number, count: number) => {
        setCompatibleConnectors((draft) => {
            const connector = draft.get(key)
            if (connector) {
                connector.connectorCount = count;
            }
        })
    }, [])

    return <>
        <TableBuilder items={compatibleConnectors} emptyState="Add a connector to get started">
            {([connectorKey, connector]) =>
                <TableBuilderRow id={connectorKey}>
                    <ComboBox
                        placeholder="Select a connector"
                        defaultItems={comboBoxItems}
                        grow isRequired
                        selectedKey={connector.connectorID}
                        onSelectionChange={(connectorID) => handleSetConnectorID(connectorKey, connectorID)}>
                        {([connectorKey, connector]) =>
                            <ComboBoxItem id={connectorKey}>
                                {connector.name}
                            </ComboBoxItem>
                        }
                    </ComboBox>
                    <X weight="bold" />
                    <NumberField placeholder="..." grow isRequired value={connector.connectorCount} onChange={(count) => handleSetConnectorCount(connectorKey, count)} />
                    <TableBuilderDeleteButton onPress={() => handleRemoveConnector(connectorKey)}/>
                </TableBuilderRow>
            }
        </TableBuilder>
        <Row justify="end">
            <Button variant="primary" onPress={() => handleAddConnector()}>
                <Plus weight="bold"/>Add connector
            </Button>
        </Row>
    </>
}



export function transformMotherboardSlotsDtoToMap(slots: Motherboard.UnitPcieSlotDto[] | null) {
    const map : RecursiveMap<RecursiveNullableNoIterable<Motherboard.UnitPcieSlotFrontend>> = new Map();
    slots?.map((slot) => {
        const seriesMap : RecursiveMap<CentralProcessor.SeriesDto> = new Map();
        const processorsMap : RecursiveMap<CentralProcessor.UnitDtoSimple> = new Map();
        const coreFamiliesMap : RecursiveMap<CentralProcessor.CoreFamilyDtoSimple> = new Map();

        slot.series.map((series) => {
            seriesMap.set(series.id, series);
        })
        slot.processors.map((processor) => {
            processorsMap.set(processor.componentID, processor);
        })
        slot.coreFamilies.map((coreFamily) => {
            coreFamiliesMap.set(coreFamily.id, coreFamily);
        })

        map.set(Math.random(), {
            configurationNumber: slot.configurationNumber,
            coreFamilies: coreFamiliesMap,
            processors: processorsMap,
            series: seriesMap,
            slotID: slot.slot.id,
            slotPosition: slot.slotPosition
        })
    })
    return map;
}

export function transformMotherboardSlotsMapToDbo(slots: RecursiveMap<Motherboard.UnitPcieSlotDto>) {
    const arr : RecursiveNullable<Motherboard.UnitPcieSlotDbo>[] = [];

    for (const slot of slots.values()) {
        const seriesIDs : (number | null)[] = [];
        const processorIDs : (number | null)[] = [];
        const coreFamilyIDs : (number | null)[] = [];

        for (const series of slot.series.values()) {
            seriesIDs.push(series.id);
        }
        for (const processor of slot.processors.values()) {
            processorIDs.push(processor.componentID);
        }
        for (const coreFamily of slot.coreFamilies.values()) {
            coreFamilyIDs.push(coreFamily.id);
        }

        arr.push({
            configurationNumber: slot.configurationNumber,
            coreFamilyIDs: coreFamilyIDs,
            processorIDs: processorIDs,
            seriesIDs: seriesIDs,
            slotID: slot.slot.id,
            slotPosition: slot.slotPosition,
        })
    }

    return arr;
}

interface MotherboardSlotsTreeBuilderProps {
    slots: RecursiveMap<RecursiveNullableNoIterable<Motherboard.UnitPcieSlotFrontend>>;
    setSlots: Updater<RecursiveMap<RecursiveNullableNoIterable<Motherboard.UnitPcieSlotFrontend>>>;
    coreFamilies: CentralProcessor.CoreFamilyDtoSimple[] | undefined;
    processors: CentralProcessor.UnitDtoSimple[] | undefined;
    series: CentralProcessor.SeriesDto[] | undefined;
    slotList: Pcie.SlotDtoSimple[] | undefined;
}

export function MotherboardSlotsTreeBuilder({ slots, setSlots, coreFamilies, processors, series, slotList } : MotherboardSlotsTreeBuilderProps) {

    const handleAddConfiguration = useCallback(() => {
        setSlots((draft) => {
            draft.set(Math.random(), {
                configurationNumber: 0,
                coreFamilies: new Map(),
                processors: new Map(),
                series: new Map(),
                slotID: null,
                slotPosition: null
            })
        })
    }, [])

    const handleRemoveConfiguration = useCallback((slotKey: number) => {
        setSlots((draft) => {
            draft.delete(slotKey);
        })
    }, [])

    const handleSetSlotID = useCallback((slotKey: number, slotID: number | null) => {
        setSlots((draft) => {
            const slot = draft.get(slotKey);
            if (slot) {
                slot.slotID = slotID;
            }
        })
    }, [])

    const handleSetSlotPosition = useCallback((slotKey: number, slotPosition: number) => {
        setSlots((draft) => {
            const slot = draft.get(slotKey);
            if (slot) {
                slot.slotPosition = slotPosition;
            }
        })
    }, [])

    const handleSetSlotConfigurationNumber = useCallback((slotKey: number, configurationNumber: number) => {
        setSlots((draft) => {
            const slot = draft.get(slotKey);
            if (slot) {
                slot.configurationNumber = configurationNumber;
            }
        })
    }, [])

    const handleSlotAddSeries = useCallback((slotKey: number, series: CentralProcessor.SeriesDto) => {
        setSlots((draft) => {
            draft.get(slotKey)?.series.set(series.id, series);
        })
    }, [])

    const handleSlotRemoveSeries = useCallback((slotKey: number, seriesKey: number) => {
        setSlots((draft) => {
            draft.get(slotKey)?.series.delete(seriesKey);
        })
    }, [])

    const handleSlotAddProcessor = useCallback((slotKey: number, processor: CentralProcessor.UnitDtoSimple) => {
        setSlots((draft) => {
            draft.get(slotKey)?.processors.set(processor.componentID, processor);
        })
    }, [])

    const handleSlotRemoveProcessor = useCallback((slotKey: number, processorKey: number) => {
        setSlots((draft) => {
            draft.get(slotKey)?.processors.delete(processorKey);
        })
    }, [])

    const handleSlotAddCoreFamily = useCallback((slotKey: number, coreFamily: CentralProcessor.CoreFamilyDtoSimple) => {
        setSlots((draft) => {
            draft.get(slotKey)?.coreFamilies.set(coreFamily.id, coreFamily);
        })
    }, [])

    const handleSlotRemoveCoreFamily = useCallback((slotKey: number, coreFamilyKey: number) => {
        setSlots((draft) => {
            draft.get(slotKey)?.coreFamilies.delete(coreFamilyKey);
        })
    }, [])

    const Poop = memo(function Poop({configurationNumber, slotKey} : {configurationNumber: number | null, slotKey: number}) {
        const handleChange = useCallback((configurationNumber : number) => {
            handleSetSlotConfigurationNumber(slotKey, configurationNumber);
        }, [])
        return <NumberField label="Configuration #" isRequired value={configurationNumber} onChange={(configurationNumber) => handleSetSlotConfigurationNumber(slotKey, configurationNumber)} />
    })

    return <>
        <DisclosureGroup allowsMultipleExpanded >
            <Collection items={slots}>
                {([slotKey, slot]) => (
                <Disclosure id={slotKey}>
                    {({isExpanded}) => <>
                        <Heading >
                            <TriggerButton>
                                {isExpanded ? <CaretDown weight="bold"/> : <CaretRight weight="bold" />}
                                Slot {slotKey}
                            </TriggerButton>
                            <TrashButton onPress={() => handleRemoveConfiguration(slotKey)}>
                                <TrashSimple weight="fill" />
                            </TrashButton>
                        </Heading>
                        <DisclosurePanel>
                            <ComboBox selectedKey={slot.slotID} onSelectionChange={(slotID) => handleSetSlotID(slotKey, slotID)} label="Slot" placeholder="Select a slot" isRequired>
                                {slot => <ComboBoxItem>{slot.name}</ComboBoxItem>}
                            </ComboBox>
                            <NumberField label="Position" isRequired value={slot.slotPosition} onChange={(slotPosition) => handleSetSlotPosition(slotKey, slotPosition)} />
                            <Poop slotKey={slotKey} configurationNumber={slot.configurationNumber} />
                            <DisclosureGroup>
                                <Disclosure>
                                    {({isExpanded}) => <>
                                        <Heading >
                                            <TriggerButton>
                                                {isExpanded ? <CaretDown weight="bold"/> : <CaretRight weight="bold" />}
                                                Series constraints
                                            </TriggerButton>
                                        </Heading>
                                        <DisclosurePanel>
                                            <CentralProcessorSeriesListBuilder
                                                slotKey={slotKey}
                                                compatibleSeries={slot.series}
                                                addSeries={handleSlotAddSeries}
                                                removeSeries={handleSlotRemoveSeries}
                                                series={series}
                                            />
                                        </DisclosurePanel>
                                    </>}
                                </Disclosure>
                                <Disclosure>
                                    {({isExpanded}) => <>
                                        <Heading >
                                            <TriggerButton>
                                                {isExpanded ? <CaretDown weight="bold"/> : <CaretRight weight="bold" />}
                                                Processor constraints
                                            </TriggerButton>
                                        </Heading>
                                        <DisclosurePanel>
                                            <CentralProcessorProcessorsListBuilder
                                                slotKey={slotKey}
                                                compatibleProcessors={slot.processors}
                                                addProcessor={handleSlotAddProcessor}
                                                removeProcessor={handleSlotRemoveProcessor}
                                                processors={processors}
                                            />
                                        </DisclosurePanel>
                                    </>}
                                </Disclosure>
                                <Disclosure>
                                    {({isExpanded}) => <>
                                        <Heading >
                                            <TriggerButton>
                                                {isExpanded ? <CaretDown weight="bold"/> : <CaretRight weight="bold" />}
                                                Core family constraints
                                            </TriggerButton>
                                            <TrashButton>
                                                {slot.coreFamilies.size > 0 && <ExclamationMark weight="bold" />}
                                            </TrashButton>
                                        </Heading>
                                        <DisclosurePanel>
                                            <CentralProcessorCoreFamiliesListBuilder
                                                slotKey={slotKey}
                                                compatibleCoreFamilies={slot.coreFamilies}
                                                addCoreFamily={handleSlotAddCoreFamily}
                                                removeCoreFamily={handleSlotRemoveCoreFamily}
                                                coreFamilies={coreFamilies}
                                            />
                                        </DisclosurePanel>
                                    </>}
                                </Disclosure>
                            </DisclosureGroup>
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


interface CentralProcessorCoreFamiliesListBuilderProps {
    slotKey: number;
    compatibleCoreFamilies: RecursiveMap<CentralProcessor.CoreFamilyDtoSimple>;
    addCoreFamily: (slotKey: number, coreFamily: CentralProcessor.CoreFamilyDtoSimple) => void;
    removeCoreFamily: (slotKey: number, coreFamilyKey: number) => void;
    coreFamilies: CentralProcessor.CoreFamilyDtoSimple[] | undefined;
}

const CentralProcessorCoreFamiliesListBuilder = memo(function CentralProcessorCoreFamiliesListBuilder({slotKey, compatibleCoreFamilies, addCoreFamily, removeCoreFamily, coreFamilies} : CentralProcessorCoreFamiliesListBuilderProps) {

    const [comboBoxItems, setComboBoxItems] = useImmer(() => {
        const map : Map<number, CentralProcessor.CoreFamilyDtoSimple> = new Map();
        if (coreFamilies) {
            for (const coreFamily of coreFamilies) {
                if (!compatibleCoreFamilies.has(coreFamily.id)) {
                    map.set(coreFamily.id, coreFamily)
                }
            }
        }
        return map;
    })

    const handleAdd = useCallback((key: number | null) => {
        if (key === null) { return; }

        const coreFamily = comboBoxItems.get(key);

        if (coreFamily) {
            addCoreFamily(slotKey, coreFamily);
            setComboBoxItems((draft) => {
                draft.delete(key);
            })
        }
    }, [comboBoxItems])

    const handleRemove = useCallback((key: number) => {
        const coreFamily = compatibleCoreFamilies.get(key);

        if (coreFamily) {
            setComboBoxItems((draft) => {
                draft.set(key, coreFamily)
            })
            removeCoreFamily(slotKey, key);
        }
    }, [comboBoxItems]);

    return (
        <ListBuilder gridListItems={compatibleCoreFamilies} comboBoxItems={comboBoxItems} handleAdd={handleAdd} handleRemove={handleRemove}>
            <ListBuilderList<[number, CentralProcessor.CoreFamilyDtoSimple]>>
                {([key, item]) =><ListBuilderListItem id={key}>{item.name}<ListBuilderTrashButton /></ListBuilderListItem>}
            </ListBuilderList>
            <ListBuilderRow>
                <ListBuilderComboBox<[number, CentralProcessor.CoreFamilyDtoSimple]>>
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
})

interface CentralProcessorSeriesListBuilderProps {
    slotKey: number;
    compatibleSeries: RecursiveMap<CentralProcessor.SeriesDto>;
    addSeries: (slotKey: number, series: CentralProcessor.SeriesDto) => void;
    removeSeries: (slotKey: number, seriesKey: number) => void;
    series: CentralProcessor.SeriesDto[] | undefined;
}

const CentralProcessorSeriesListBuilder = memo(function CentralProcessorSeriesListBuilder({slotKey, compatibleSeries, addSeries, removeSeries, series} : CentralProcessorSeriesListBuilderProps) {

    const [comboBoxItems, setComboBoxItems] = useImmer(() => {
        const map : Map<number, CentralProcessor.SeriesDto> = new Map();
        if (series) {
            for (const series1 of series) {
                if (!compatibleSeries.has(series1.id)) {
                    map.set(series1.id, series1)
                }
            }
        }
        return map;
    })

    const handleAdd = useCallback((key: number | null) => {
        if (key === null) { return; }

        const series = comboBoxItems.get(key);

        if (series) {
            addSeries(slotKey, series);
            setComboBoxItems((draft) => {
                draft.delete(key);
            })
        }
    }, [comboBoxItems])

    const handleRemove = useCallback((key: number) => {
        const series = compatibleSeries.get(key);

        if (series) {
            setComboBoxItems((draft) => {
                draft.set(key, series)
            })
            removeSeries(slotKey, key);
        }
    }, [comboBoxItems]);

    return (
        <ListBuilder gridListItems={compatibleSeries} comboBoxItems={comboBoxItems} handleAdd={handleAdd} handleRemove={handleRemove}>
            <ListBuilderList<[number, CentralProcessor.SeriesDto]>>
                {([key, item]) =><ListBuilderListItem id={key}>{item.name}<ListBuilderTrashButton /></ListBuilderListItem>}
            </ListBuilderList>
            <ListBuilderRow>
                <ListBuilderComboBox<[number, CentralProcessor.SeriesDto]>>
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
})

interface CentralProcessorProcessorsListBuilderProps {
    slotKey: number;
    compatibleProcessors: RecursiveMap<CentralProcessor.UnitDtoSimple>;
    addProcessor: (slotKey: number, processor: CentralProcessor.UnitDtoSimple) => void;
    removeProcessor: (slotKey: number, processorKey: number) => void;
    processors: CentralProcessor.UnitDtoSimple[] | undefined;
}

const CentralProcessorProcessorsListBuilder = memo(function CentralProcessorProcessorsListBuilder({slotKey, compatibleProcessors, addProcessor, removeProcessor, processors} : CentralProcessorProcessorsListBuilderProps) {

    const [comboBoxItems, setComboBoxItems] = useImmer(() => {
        const map : Map<number, CentralProcessor.UnitDtoSimple> = new Map();
        if (processors) {
            for (const processor of processors) {
                if (!compatibleProcessors.has(processor.componentID)) {
                    map.set(processor.componentID, processor)
                }
            }
        }
        return map;
    })

    const handleAdd = useCallback((key: number | null) => {
        if (key === null) { return; }

        const processor = comboBoxItems.get(key);

        if (processor) {
            addProcessor(slotKey, processor);
            setComboBoxItems((draft) => {
                draft.delete(key);
            })
        }
    }, [comboBoxItems])

    const handleRemove = useCallback((key: number) => {
        const processor = compatibleProcessors.get(key);

        if (processor) {
            setComboBoxItems((draft) => {
                draft.set(key, processor)
            })
            removeProcessor(slotKey, key);
        }
    }, [comboBoxItems]);

    return (
    // @ts-ignore
        <ListBuilder gridListItems={compatibleProcessors} comboBoxItems={comboBoxItems} handleAdd={handleAdd} handleRemove={handleRemove}>
            <ListBuilderList<[number, CentralProcessor.UnitDtoSimple]>>
                {([key, item]) =><ListBuilderListItem id={key}>{item.name}<ListBuilderTrashButton /></ListBuilderListItem>}
            </ListBuilderList>
            <ListBuilderRow>
                <ListBuilderComboBox<[number, CentralProcessor.UnitDtoSimple]>>
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
});