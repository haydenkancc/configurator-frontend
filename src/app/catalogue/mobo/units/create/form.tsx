'use client'
import {Content, Grid, Module, PostBody, Row} from '@/app/catalogue/_templates/view';

import {TextField} from '@/components/ui/text-field';
import {useReducer, useRef, useState} from 'react';
import {PostFormProps, RecursivePartial} from '@/server/models'
import {
    MotherboardUnitDbo,
    MotherboardUnitParams,
    ComponentDbo,
    FanPackIOConnector,
    MotherboardUnitIOConnector,
    MotherboardUnitPowerSupplyConnector,
    MotherboardUnitSlotPositionListDataItem,
    MotherboardUnitSlotPositionSlotListDataItem,
    MotherboardUnitSlotSeriesListDataItem,
    MotherboardUnitSlotProcessorListDataItem,
    MotherboardUnitSlotConfigurationListDataItem,
    MotherboardUnitSlotCoreFamilyListDataItem, MotherboardUnitPCIeSlotDbo
} from '@/server/models/components';
import {NumberField} from '@/components/ui/number-field';
import {Checkbox} from '@/components/ui/checkbox';
import {
    CentralProcessorChannelComboBox,
    ComponentModule,
    componentModuleReducer,
    IOConnectorsTableBuilder,
    MemoryCapacityComboBox,
    MemoryFormFactorComboBox,
    MemoryTypeComboBox,
    MotherboardChipsetComboBox,
    MotherboardFormFactorComboBox,
    MotherboardSlotConfigurationTreeBuilder,
    PowerSupplyConnectorsTableBuilder,
    SlotListDataToDbo
} from '@/app/catalogue/_templates/forms';
import {useListData} from 'react-stately';
import { Button } from 'react-aria-components';

export function Form({action, params}: PostFormProps<MotherboardUnitDbo, MotherboardUnitParams>) {

    const [componentState,componentDispatch]
        = useReducer(componentModuleReducer, { onSale: false, saleable: true })

    const [chipsetID, setChipsetID] = useState<number | undefined>()
    const [formFactorID, setFormFactorID] = useState<number | undefined>()
    const [channelID, setChannelID] = useState<number | undefined>()
    const [memoryFormFactorID, setMemoryFormFactorID] = useState<number | undefined>()
    const [memoryTypeID, setMemoryTypeID] = useState<number | undefined>()
    const [memoryTotalCapacityID, setMemoryTotalCapacityID] = useState<number | undefined>()
    const [memorySlotCount, setMemorySlotCount] = useState<number | undefined>()
    const [supportECCMemory, setSupportECCMemory] = useState<boolean | undefined>(false)
    const [supportNonECCMemory, setSupportNonECCMemory] = useState<boolean | undefined>(false)
    const [supportBufferedMemory, setSupportBufferedMemory] = useState<boolean | undefined>(false)
    const [supportUnbufferedMemory, setSupportUnbufferedMemory] = useState<boolean | undefined>(false)

    const rowIdRef = useRef(0)

    const connectorList= useListData<{id: number} & MotherboardUnitIOConnector>({
        initialItems: [],
        getKey: (k) => k.id
    });

    const powerSupplyConnectorList= useListData<{id: number} & MotherboardUnitPowerSupplyConnector>({
        initialItems: [],
        getKey: (k) => k.id
    });

    const pcieSlotPositions = useListData<MotherboardUnitSlotPositionListDataItem>({})
    const pcieSlotPositionSlots = useListData<MotherboardUnitSlotPositionSlotListDataItem>({})
    const pcieSlotConfigurations = useListData<MotherboardUnitSlotConfigurationListDataItem>({})
    const pcieSlotSeries = useListData<MotherboardUnitSlotSeriesListDataItem>({})
    const pcieSlotProcessors = useListData<MotherboardUnitSlotProcessorListDataItem>({})
    const pcieSlotCoreFamilies = useListData<MotherboardUnitSlotCoreFamilyListDataItem>({})

    const m2SlotPositions = useListData<MotherboardUnitSlotPositionListDataItem>({})
    const m2SlotPositionSlots = useListData<MotherboardUnitSlotPositionSlotListDataItem>({})
    const m2SlotConfigurations = useListData<MotherboardUnitSlotConfigurationListDataItem>({})
    const m2SlotSeries = useListData<MotherboardUnitSlotSeriesListDataItem>({})
    const m2SlotProcessors = useListData<MotherboardUnitSlotProcessorListDataItem>({})
    const m2SlotCoreFamilies = useListData<MotherboardUnitSlotCoreFamilyListDataItem>({})



    return (
        <PostBody name="unit" submitAction={async () => await action({
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
        </PostBody>
    )
}