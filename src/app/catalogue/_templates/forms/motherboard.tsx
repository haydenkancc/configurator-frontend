import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import {
    CentralProcessorCoreFamily,
    CentralProcessorSeries, CentralProcessorUnitSimple,
    M2SlotSimple,
    MotherboardChipset,
    MotherboardFormFactor, MotherboardUnitPCIeSlot, MotherboardUnitPCIeSlotDbo,
    MotherboardUnitSlotConfigurationListDataItem, MotherboardUnitSlotCoreFamilyListDataItem,
    MotherboardUnitSlotPositionListDataItem,
    MotherboardUnitSlotPositionSlotListDataItem,
    MotherboardUnitSlotProcessorListDataItem,
    MotherboardUnitSlotSeriesListDataItem, PCIeSlotSimple
} from '@/server/models/components';
import {ListData} from 'react-stately';
import React from 'react';
import {TreeBuilder, TreeBuilderBranch, TreeBuilderDropdown} from '@/components/ui/tree-builder';
import {TextField} from '@/components/ui/text-field';
import {Equals} from '@phosphor-icons/react';
import {NumberField} from '@/components/ui/number-field';
import {
    CentralProcessorCoreFamilyComboBox,
    CentralProcessorSeriesComboBox, CentralProcessorUnitComboBox
} from '@/app/catalogue/_templates/forms/central-processor';
import {Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import {Plus} from '@phosphor-icons/react/dist/ssr';
import {PCIeSlotComboBox} from '@/app/catalogue/_templates/forms/pcie';
import {RecursivePartial} from '@/server/models';

export function MotherboardChipsetComboBox({...props} : ComboBoxProps<MotherboardChipset>) {
    return (
        <ComboBox label="Chipset" placeholder="Select a chipset" isRequired {...props}>
            {chipset => (
                <ComboBoxItem id={chipset.id}>{chipset.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function MotherboardFormFactorComboBox({...props} : ComboBoxProps<MotherboardFormFactor>) {
    return (
        <ComboBox label="Form factor" placeholder="Select a form factor" isRequired {...props}>
            {formFactor => (
                <ComboBoxItem id={formFactor.id}>{formFactor.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}


interface MotherboardSlotConfigurationTreeBuilderProps {
    slotConfigurations: ListData<MotherboardUnitSlotConfigurationListDataItem>;
    slotPositions: ListData<MotherboardUnitSlotPositionListDataItem>;
    slotPositionSlots: ListData<MotherboardUnitSlotPositionSlotListDataItem>;
    slotSeries: ListData<MotherboardUnitSlotSeriesListDataItem>;
    slotProcessors: ListData<MotherboardUnitSlotProcessorListDataItem>;
    slotCoreFamilies: ListData<MotherboardUnitSlotCoreFamilyListDataItem>;
    slotsParam?: PCIeSlotSimple[] | M2SlotSimple[];
    seriesParam?: CentralProcessorSeries[];
    coreFamilyParam?: CentralProcessorCoreFamily[];
    processorsParam?: CentralProcessorUnitSimple[];
    rowIdRef: React.MutableRefObject<number>;
}


interface MotherboardSlotConfigurationTreeBuilderProps {
    slotPositions: ListData<MotherboardUnitSlotPositionListDataItem>;
    slotPositionSlots: ListData<MotherboardUnitSlotPositionSlotListDataItem>;
    slotConfigurations: ListData<MotherboardUnitSlotConfigurationListDataItem>;
    slotSeries: ListData<MotherboardUnitSlotSeriesListDataItem>;
    slotProcessors: ListData<MotherboardUnitSlotProcessorListDataItem>;
    slotCoreFamilies: ListData<MotherboardUnitSlotCoreFamilyListDataItem>;
    slotsParam?: PCIeSlotSimple[] | M2SlotSimple[];
    seriesParam?: CentralProcessorSeries[];
    coreFamilyParam?: CentralProcessorCoreFamily[];
    processorsParam?: CentralProcessorUnitSimple[];
    rowIdRef: React.MutableRefObject<number>;
}

export function DtoToSlotListData( rowIdRef: React.MutableRefObject<number>, slots?: MotherboardUnitPCIeSlot[]) {
    const data = slots?.reduce<[MotherboardUnitSlotPositionListDataItem[], MotherboardUnitSlotPositionSlotListDataItem[], MotherboardUnitSlotConfigurationListDataItem[], MotherboardUnitSlotSeriesListDataItem[], MotherboardUnitSlotProcessorListDataItem[], MotherboardUnitSlotCoreFamilyListDataItem[]]>(
        (accumulator, slot) => {
            const slotPosition = accumulator[0].find(e => e.slotPosition == slot.slotPosition);
            let slotPositionID: number;
            if (!slotPosition) {
                slotPositionID = ++rowIdRef.current;
                accumulator[0].push({ id: slotPositionID, slotPosition: slot.slotPosition, open: true })
            } else {
                slotPositionID = slotPosition.id
            }

            const slotPositionSlot = accumulator[1].find(e => e.slotID == slot.slotID && e.slotPositionID == slotPositionID);
            let unitSlotID: number;
            if (!slotPositionSlot) {
                unitSlotID = ++rowIdRef.current;
                accumulator[1].push({
                    configurationOpen: false,
                    coreFamilyOpen: false,
                    open: false,
                    processorOpen: false,
                    seriesOpen: false,
                    id: unitSlotID, slotPositionID: slotPositionID, slotID: slot.slotID
                })
            } else {
                unitSlotID = slotPositionSlot.id
            }
            if (slot.configurationNumber > 0) {
                accumulator[2].push({
                    configurationNumber: slot.configurationNumber,
                    id: ++rowIdRef.current,
                    unitSlotID: unitSlotID,
                })
            }
            if (slot.series) {
                for (const series of slot.series) {
                    accumulator[3].push({
                        id: ++rowIdRef.current,
                        unitSlotID: unitSlotID,
                        seriesID: series.id,
                    })
                }
            }
            if (slot.processors) {
                for (const processor of slot.processors) {
                    accumulator[4].push({
                        id: ++rowIdRef.current,
                        unitSlotID: unitSlotID,
                        componentID: processor.componentID,
                    })
                }
            }
            if (slot.coreFamilies) {
                for (const coreFamily of slot.coreFamilies) {
                    accumulator[5].push({
                        id: ++rowIdRef.current,
                        unitSlotID: unitSlotID,
                        coreFamilyID: coreFamily.id,

                    })
                }
            }

            return accumulator;
        },
        [[], [], [], [], [], []]
    )

    return data ?? [[], [], [], [], [], []];
}


export function SlotListDataToDbo(
    slotPositions: ListData<MotherboardUnitSlotPositionListDataItem>,
    slotPositionSlots: ListData<MotherboardUnitSlotPositionSlotListDataItem>,
    slotConfigurations: ListData<MotherboardUnitSlotConfigurationListDataItem>,
    slotSeries: ListData<MotherboardUnitSlotSeriesListDataItem>,
    slotProcessors: ListData<MotherboardUnitSlotProcessorListDataItem>,
    slotCoreFamilies: ListData<MotherboardUnitSlotCoreFamilyListDataItem>,
    ) {
    const dbo = slotPositions.items.reduce<RecursivePartial<MotherboardUnitPCIeSlotDbo>[]>(
        (accumulator, slotPosition) => {
            accumulator.push(...slotPositionSlots.items
                .filter(e => e.slotPositionID == slotPosition.id)
                .reduce<RecursivePartial<MotherboardUnitPCIeSlotDbo>[]>((accumulator1, slot) => {

                    const configurations = slotConfigurations.items.filter(e => e.unitSlotID == slot.id);

                    if (configurations.length > 0) {
                        accumulator1.push(...slotConfigurations.items
                            .filter(e => e.unitSlotID == slot.id)
                            .reduce<RecursivePartial<MotherboardUnitPCIeSlotDbo>[]>((accumulator2, configuration) => {
                                if (slot.slotID > 0) {
                                    accumulator2.push({
                                        slotPosition: slotPosition.slotPosition,
                                        slotID: slot.slotID,
                                        configurationNumber: configuration.configurationNumber,
                                        seriesIDs: slotSeries.items
                                            .filter(e => e.unitSlotID == slot.id)
                                            .filter(({seriesID}) => seriesID > 0)
                                            .map(({ seriesID}) => seriesID),
                                        processorIDs: slotProcessors.items
                                            .filter(e => e.unitSlotID == slot.id)
                                            .filter(({componentID}) => componentID > 0)
                                            .map(({componentID}) => componentID),
                                        coreFamilyIDs: slotCoreFamilies.items
                                            .filter(e => e.unitSlotID == slot.id)
                                            .filter(({coreFamilyID}) => coreFamilyID > 0)
                                            .map(({coreFamilyID}) => coreFamilyID)
                                    })
                                }
                                return accumulator2;
                            }, [])
                        )
                    } else {
                        accumulator1.push({
                            slotPosition: slotPosition.slotPosition,
                            slotID: slot.slotID,
                            seriesIDs: slotSeries.items.filter(e => e.unitSlotID == slot.id).map(({seriesID}) => seriesID),
                            processorIDs: slotProcessors.items.filter(e => e.unitSlotID == slot.id).map(({componentID}) => componentID),
                            coreFamilyIDs: slotCoreFamilies.items.filter(e => e.unitSlotID == slot.id).map(({coreFamilyID}) => coreFamilyID)
                        })
                    }

                    return accumulator1;
                }, [])
            )
            return accumulator;
        }, []
    );

    console.log(dbo);
    return dbo;
}


export function MotherboardSlotConfigurationTreeBuilder({slotPositions, slotCoreFamilies, coreFamilyParam, slotPositionSlots, slotSeries, slotConfigurations, slotProcessors, slotsParam, seriesParam, processorsParam, rowIdRef}: MotherboardSlotConfigurationTreeBuilderProps) {


    return (
        <>
            <TreeBuilder list={slotPositions.items}>
                {slotPosition => (
                    <TreeBuilderDropdown
                        newMessage="New slot configuration"
                        hasDropdownChildren
                        isRoot
                        open={slotPosition.open}
                        openAction={(open) => slotPositions.update(slotPosition.id, {...slotPosition, open})}
                        removeAction={() => slotPositions.remove(slotPosition.id)}
                        addAction={() => slotPositionSlots.append({
                            id: rowIdRef.current++,
                            slotPositionID: slotPosition.id,
                            slotID: 0,
                            open: false,
                            configurationOpen: false,
                            processorOpen: false,
                            coreFamilyOpen: false,
                            seriesOpen: false,
                        })}
                        branches={slotPositionSlots.items.filter(e => e.slotPositionID === slotPosition.id)}
                        branch={(slotPositionSlot) =>
                            <TreeBuilderDropdown hasDropdownChildren open={slotPositionSlot.open}
                                 indent={1}
                                 noNew
                                 openAction={(open) => slotPositionSlots.update(slotPositionSlot.id, {...slotPositionSlot, open})}
                                 removeAction={() => slotPositionSlots.remove(slotPositionSlot.id)}
                                 dropdowns={
                                     <>
                                         <TreeBuilderDropdown
                                             open={slotPositionSlot.configurationOpen}
                                             openAction={(open) => slotPositionSlots.update(slotPositionSlot.id, {...slotPositionSlot, configurationOpen: open})}
                                             newMessage="New configuration constraint"
                                             addAction={() => {
                                                 slotConfigurations.append({
                                                     id: ++rowIdRef.current,
                                                     unitSlotID: slotPositionSlot.id,
                                                     configurationNumber: undefined as unknown as number,
                                                 })
                                             }}
                                             branches={slotConfigurations.items.filter(e => e.unitSlotID == slotPositionSlot.id)}
                                             branch={(slotConfiguration) => (
                                                 <TreeBuilderBranch indent={3} removeAction={() => slotConfigurations.remove(slotConfiguration.id)}>
                                                     <TextField grow value="Configuration number" isDisabled isReadOnly />
                                                     <Equals weight="bold" />
                                                     <NumberField grow value={slotConfiguration.configurationNumber} onChange={(configurationNumber) => slotConfigurations.update(slotConfiguration.id, {...slotConfiguration, configurationNumber})}/>
                                                 </TreeBuilderBranch>
                                             )}
                                             noTrash indent={2}

                                         >
                                             Configuration constraints
                                         </TreeBuilderDropdown>
                                         <TreeBuilderDropdown
                                             open={slotPositionSlot.seriesOpen}
                                             openAction={(open) => slotPositionSlots.update(slotPositionSlot.id, {...slotPositionSlot, seriesOpen: open})}
                                             newMessage="New series constraint"
                                             addAction={() => {
                                                 slotSeries.append({
                                                     id: ++rowIdRef.current,
                                                     unitSlotID: slotPositionSlot.id,
                                                     seriesID: 0,
                                                 })
                                             }}
                                             noTrash
                                             indent={2}
                                             branches={slotSeries.items.filter(e => e.unitSlotID === slotPositionSlot.id)}
                                             branch={(series) =>
                                                 (
                                                     <TreeBuilderBranch indent={3} removeAction={() => slotSeries.remove(series.id)}>
                                                         <CentralProcessorSeriesComboBox
                                                             label=""
                                                             selectedKey={series.seriesID}
                                                             onSelectionChange={(key) => slotSeries.update(series.id, {...series, seriesID: key as number})}
                                                             defaultItems={seriesParam}
                                                         />
                                                     </TreeBuilderBranch>
                                                 )}
                                         >
                                             Series constraints
                                         </TreeBuilderDropdown>
                                         <TreeBuilderDropdown
                                             open={slotPositionSlot.coreFamilyOpen}
                                             openAction={(open) => slotPositionSlots.update(slotPositionSlot.id, {...slotPositionSlot, coreFamilyOpen: open})}
                                             newMessage="New core family constraint" noTrash indent={2}
                                             addAction={() => {
                                                 slotCoreFamilies.append({
                                                     id: ++rowIdRef.current,
                                                     unitSlotID: slotPositionSlot.id,
                                                     coreFamilyID: 0,
                                                 })
                                             }}
                                             branches={slotCoreFamilies.items.filter(e => e.unitSlotID == slotPositionSlot.id)}
                                             branch={(coreFamily) => (
                                                 <TreeBuilderBranch indent={3} removeAction={() => slotCoreFamilies.remove(coreFamily.id)}>
                                                     <CentralProcessorCoreFamilyComboBox grow label="" selectedKey={coreFamily.coreFamilyID} onSelectionChange={(key) => slotCoreFamilies.update(coreFamily.id, {...coreFamily, coreFamilyID: key as number})} defaultItems={coreFamilyParam} />
                                                 </TreeBuilderBranch>
                                             )}
                                         >
                                             Core family constraints
                                         </TreeBuilderDropdown>
                                         <TreeBuilderDropdown
                                             open={slotPositionSlot.processorOpen}
                                             openAction={(open) => slotPositionSlots.update(slotPositionSlot.id, {...slotPositionSlot, processorOpen: open})}
                                             newMessage="New processor constraint" noTrash indent={2}
                                             addAction={() => {
                                                 slotProcessors.append({
                                                     id: ++rowIdRef.current,
                                                     unitSlotID: slotPositionSlot.id,
                                                     componentID: 0,
                                                 })
                                             }}
                                             branches={slotProcessors.items.filter(e => e.unitSlotID == slotPositionSlot.id)}
                                             branch={(processor) => (
                                                 <TreeBuilderBranch indent={3} removeAction={() => slotProcessors.remove(processor.id)}>
                                                     <CentralProcessorUnitComboBox grow defaultItems={processorsParam} />
                                                 </TreeBuilderBranch>
                                             )}
                                         >
                                             Processor constraints
                                         </TreeBuilderDropdown>
                                     </>
                                 }
                            >
                                <PCIeSlotComboBox
                                    grow
                                    defaultItems={slotsParam}
                                    selectedKey={slotPositionSlot.slotID}
                                    onSelectionChange={
                                        (key) => {slotPositionSlots.update(slotPositionSlot.id, {
                                            ...slotPositionSlot,
                                            slotID: key as number,
                                        })}
                                    }
                                />
                            </TreeBuilderDropdown>
                        }
                    >
                        <TextField value="Slot position" isReadOnly grow isDisabled/>
                        <Equals weight="bold" />
                        <NumberField grow value={slotPosition.slotPosition} onChange={(value) => slotPositions.update(slotPosition.id, {...slotPosition, slotPosition: value})}/>
                    </TreeBuilderDropdown>
                )}
            </TreeBuilder>
            <Row justify="center"><Button variant="primary" onPress={() => slotPositions.append({
                id: ++rowIdRef.current,
                slotPosition: undefined as unknown as number,
                open: true,
            })}><Plus weight="bold" />New slot position</Button></Row>
        </>
    )
}
