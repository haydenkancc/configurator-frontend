'use client';
import {PostFormProps, PutFormProps} from '@/server/models'
import {
    MotherboardUnit,
    MotherboardUnitDbo,
    MotherboardUnitIOConnector,
    MotherboardUnitParams,
    MotherboardUnitPowerSupplyConnector,
    MotherboardUnitSlotConfigurationListDataItem, MotherboardUnitSlotCoreFamilyListDataItem,
    MotherboardUnitSlotPositionListDataItem,
    MotherboardUnitSlotPositionSlotListDataItem, MotherboardUnitSlotProcessorListDataItem,
    MotherboardUnitSlotSeriesListDataItem
} from '@/server/models/components';
import {Content, Grid, Module, PostBody, PutBody, Row} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useReducer, useRef, useState} from 'react';
import {
    ComponentModule,
    componentModuleReducer,
    MotherboardChipsetComboBox,
    MemoryCapacityComboBox,
    MemoryTypeComboBox,
    PCIeExpansionCardModule,
    PCIeExpansionCardModuleReducer,
    TransformComponentToDbo,
    TransformPCIeExpansionCardToDbo,
    SlotListDataToDbo,
    MotherboardFormFactorComboBox,
    MemoryFormFactorComboBox,
    CentralProcessorChannelComboBox,
    IOConnectorsTableBuilder,
    PowerSupplyConnectorsTableBuilder, MotherboardSlotConfigurationTreeBuilder, DtoToSlotListData
} from '@/app/catalogue/_templates/forms';
import {useListData} from 'react-stately';
import {Checkbox} from '@/components/ui/checkbox';

export function Form({item, action, params}: PutFormProps<MotherboardUnit, MotherboardUnitDbo, MotherboardUnitParams>) {

    const [componentState,componentDispatch]
        = useReducer(componentModuleReducer, TransformComponentToDbo(item?.component))

    const [chipsetID, setChipsetID] = useState<number | undefined>(item?.chipset.id)
    const [formFactorID, setFormFactorID] = useState<number | undefined>(item?.formFactor.id)
    const [channelID, setChannelID] = useState<number | undefined>(item?.channel.id)
    const [memoryFormFactorID, setMemoryFormFactorID] = useState<number | undefined>(item?.memoryFormFactor.id)
    const [memoryTypeID, setMemoryTypeID] = useState<number | undefined>(item?.memoryType.id)
    const [memoryTotalCapacityID, setMemoryTotalCapacityID] = useState<number | undefined>(item?.memoryTotalCapacity)
    const [memorySlotCount, setMemorySlotCount] = useState<number | undefined>(item?.memorySlotCount)
    const [supportECCMemory, setSupportECCMemory] = useState<boolean | undefined>(item?.supportECCMemory)
    const [supportNonECCMemory, setSupportNonECCMemory] = useState<boolean | undefined>(item?.supportNonECCMemory)
    const [supportBufferedMemory, setSupportBufferedMemory] = useState<boolean | undefined>(item?.supportBufferedMemory)
    const [supportUnbufferedMemory, setSupportUnbufferedMemory] = useState<boolean | undefined>(item?.supportUnbufferedMemory)

    const rowIdRef = useRef(0)

    const connectorList= useListData<{id: number} & MotherboardUnitIOConnector>({
        initialItems: item?.ioConnectors.map((connector) => ({ id: ++rowIdRef.current, ...connector})),
    });

    const powerSupplyConnectorList= useListData<{id: number} & MotherboardUnitPowerSupplyConnector>({
        initialItems: item?.powerSupplyConnectors.map((connector) => ({ id: ++rowIdRef.current, ...connector})),
    });

    const [a, b, c, d, e, f] = DtoToSlotListData(rowIdRef, item?.pcieSlots)
    const [g, h, i, j, k, l] = DtoToSlotListData(rowIdRef, item?.m2Slots)

    const pcieSlotPositions = useListData<MotherboardUnitSlotPositionListDataItem>({
        initialItems: a,
    })
    const pcieSlotPositionSlots = useListData<MotherboardUnitSlotPositionSlotListDataItem>({
        initialItems: b,
    })
    const pcieSlotConfigurations = useListData<MotherboardUnitSlotConfigurationListDataItem>({
        initialItems: c,
    })
    const pcieSlotSeries = useListData<MotherboardUnitSlotSeriesListDataItem>({
        initialItems: d,
    })
    const pcieSlotProcessors = useListData<MotherboardUnitSlotProcessorListDataItem>({
        initialItems: e,
    })
    const pcieSlotCoreFamilies = useListData<MotherboardUnitSlotCoreFamilyListDataItem>({
        initialItems: f,
    })

    const m2SlotPositions = useListData<MotherboardUnitSlotPositionListDataItem>({
        initialItems: g,
    })
    const m2SlotPositionSlots = useListData<MotherboardUnitSlotPositionSlotListDataItem>({
        initialItems: h,
    })
    const m2SlotConfigurations = useListData<MotherboardUnitSlotConfigurationListDataItem>({
        initialItems: i,
    })
    const m2SlotSeries = useListData<MotherboardUnitSlotSeriesListDataItem>({
        initialItems: j,
    })
    const m2SlotProcessors = useListData<MotherboardUnitSlotProcessorListDataItem>({
        initialItems: k,
    })
    const m2SlotCoreFamilies = useListData<MotherboardUnitSlotCoreFamilyListDataItem>({
        initialItems: l,
    })



    return (
        <PutBody name="unit" submitAction={async () => await action({
            chipsetID, formFactorID, channelID, memoryFormFactorID, memoryTypeID, memoryTotalCapacityID,
            memorySlotCount, supportECCMemory, supportNonECCMemory, supportBufferedMemory, supportUnbufferedMemory,
            component: componentState,
            pcieSlots: SlotListDataToDbo(pcieSlotPositions, pcieSlotPositionSlots, pcieSlotConfigurations, pcieSlotSeries, pcieSlotProcessors, pcieSlotCoreFamilies),
            m2Slots: SlotListDataToDbo(m2SlotPositions, m2SlotPositionSlots, m2SlotConfigurations, m2SlotSeries, m2SlotProcessors, m2SlotCoreFamilies),
            ioConnectors: connectorList.items.map(({ id, ...connector}) => connector),
            powerSupplyConnectors: powerSupplyConnectorList.items.map(({ id, ...connector}) => connector),


        })}>
            <ComponentModule state={componentState} dispatch={componentDispatch} params={params?.component} />
            <Module title="Motherboard unit details" subtitle="Specify details for a new motherboard unit.">
                <Content>
                    <Row>
                        <MotherboardChipsetComboBox grow selectedKey={chipsetID} onSelectionChange={(key) => setChipsetID(key as number)} defaultItems={params?.chipsets} />
                        <MotherboardFormFactorComboBox grow selectedKey={formFactorID} onSelectionChange={(key) => setFormFactorID(key as number)} defaultItems={params?.formFactors} />
                    </Row>
                    <Row>
                        <MemoryFormFactorComboBox label="Memory form factor" selectedKey={memoryFormFactorID} onSelectionChange={(key) => setMemoryFormFactorID(key as number)} defaultItems={params?.memoryFormFactors} />
                        <MemoryTypeComboBox label="Memory type" selectedKey={memoryTypeID} onSelectionChange={(key) => setMemoryTypeID(key as number)} defaultItems={params?.memoryTypes} />
                    </Row>
                    <Row>
                        <NumberField grow label="Memory slots" value={memorySlotCount} onChange={setMemorySlotCount} />
                        <MemoryCapacityComboBox label="Maximum memory capacity (GB)" selectedKey={memoryTotalCapacityID} onSelectionChange={(key) => setMemoryTotalCapacityID(key as number)} defaultItems={params?.memoryCapacities}/>
                    </Row>
                    <Row>
                        <CentralProcessorChannelComboBox selectedKey={channelID} onSelectionChange={(key) => setChannelID(key as number)} defaultItems={params?.channels} />
                    </Row>
                    <Grid>
                        <Checkbox isSelected={supportNonECCMemory} onChange={setSupportNonECCMemory}>Supports non-ECC memory</Checkbox>
                        <Checkbox isSelected={supportECCMemory} onChange={setSupportECCMemory}>Supports ECC memory</Checkbox>
                        <Checkbox isSelected={supportUnbufferedMemory} onChange={setSupportUnbufferedMemory}>Supports unbuffered memory</Checkbox>
                        <Checkbox isSelected={supportBufferedMemory} onChange={setSupportBufferedMemory}>Supports buffered memory</Checkbox>
                    </Grid>
                </Content>
            </Module>
            <Module title="Motherboard unit I/O connectors" subtitle="Specify this motherboard unit's internal I/O connectors">
                <Content>
                    <IOConnectorsTableBuilder rows={connectorList} rowIdRef={rowIdRef} connectors={params?.ioConnectors}/>
                </Content>
            </Module>
            <Module title="Motherboard unit power supply connectors" subtitle="Specify this motherboard unit's power supply connections">
                <Content>
                    <PowerSupplyConnectorsTableBuilder rows={powerSupplyConnectorList} rowIdRef={rowIdRef} connectors={params?.powerSupplyConnectors}/>
                </Content>
            </Module>
            <Module title="Motherboard unit PCIe slots" subtitle="Specify this motherboard unit's available PCIe slots">
                <Content>
                    <MotherboardSlotConfigurationTreeBuilder slotCoreFamilies={pcieSlotCoreFamilies} coreFamilyParam={params?.coreFamilies} slotsParam={params?.pcieSlots} seriesParam={params?.series} processorsParam={params?.processors} slotPositions={pcieSlotPositions} slotPositionSlots={pcieSlotPositionSlots} slotConfigurations={pcieSlotConfigurations} slotSeries={pcieSlotSeries} slotProcessors={pcieSlotProcessors} rowIdRef={rowIdRef} />
                </Content>
            </Module>
            <Module title="Motherboard unit M.2 slots" subtitle="Specify this motherboard unit's available M.2 slots">
                <Content>
                    <MotherboardSlotConfigurationTreeBuilder slotCoreFamilies={m2SlotCoreFamilies} coreFamilyParam={params?.coreFamilies} slotsParam={params?.m2Slots} seriesParam={params?.series} processorsParam={params?.processors} slotPositions={m2SlotPositions} slotPositionSlots={m2SlotPositionSlots} slotConfigurations={m2SlotConfigurations} slotSeries={m2SlotSeries} slotProcessors={m2SlotProcessors} rowIdRef={rowIdRef} />
                </Content>
            </Module>
        </PutBody>
    )
}