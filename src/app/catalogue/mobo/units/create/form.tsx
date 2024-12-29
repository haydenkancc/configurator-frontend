'use client'
import {Content, Grid, Module, PostBody, PutBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {useReducer, useRef, useState} from 'react';
import {PostFormProps} from '@/server/models'
import { Motherboard } from '@/server/models/catalogue';
import {
    ComponentModule,
    componentModuleReducer,
    MemoryFormFactorComboBox,
    MemoryTypeComboBox,
    MotherboardChipsetComboBox,
    MotherboardConnectorsTableBuilder,
    MotherboardFormFactorComboBox,
    MotherboardSlotsTreeBuilder,
    transformComponentToDbo,
    transformMotherboardIOConnectorsDtoToMap,
    transformMotherboardPowerSupplyConnectorsDtoToMap,
    transformMotherboardSlotsDtoToMap
} from '@/components/catalogue/views/forms';
import {Checkbox} from '@/components/ui/checkbox';
import {NumberField} from '@/components/ui/number-field';
import {useImmer} from 'use-immer';

export function Form({action, params}: PostFormProps<Motherboard.UnitDbo, Motherboard.UnitParams>) {

    const [componentState, componentDispatch] = useReducer(componentModuleReducer, transformComponentToDbo())

    const [chipsetID, setChipsetID] = useState<number | null>(null);
    const [formFactorID, setFormFactorID] = useState<number | null>(null);
    const [channelCount, setChannelCount] = useState<number | null>(null);
    const [memoryFormFactorID, setMemoryFormFactorID] = useState<number | null>(null);
    const [memoryTypeID, setMemoryTypeID] = useState<number | null>(null);
    const [memoryTotalCapacity, setMemoryTotalCapacity] = useState<number | null>(null);
    const [memorySlotCount, setMemorySlotCount] = useState<number | null>(null);
    const [supportECCMemory, setSupportECCMemory] = useState<boolean>(false);
    const [supportNonECCMemory, setSupportNonECCMemory] = useState<boolean>(false);
    const [supportBufferedMemory, setSupportBufferedMemory] = useState<boolean>(false);
    const [supportUnbufferedMemory, setSupportUnbufferedMemory] = useState<boolean>(false);

    const counterRef = useRef(0);

    const [unitPowerSupplyConnectors, setUnitPowerSupplyConnectors] = useImmer(transformMotherboardPowerSupplyConnectorsDtoToMap(null, counterRef));
    const [unitIOConnectors, setUnitIOConnectors] = useImmer(transformMotherboardIOConnectorsDtoToMap(null, counterRef));

    const [pcieSlots, setPcieSlots] = useImmer(transformMotherboardSlotsDtoToMap(null));

    return (
        <PostBody name="unit" submitAction={async () => await action({
            formFactorID, typeID, capacity, clockFrequency, height, isECC, isBuffered, moduleCount,
            casLatency, firstWordLatency, voltage, timing, component: componentState,
        })}>
            <ComponentModule state={componentState} dispatch={componentDispatch} params={params?.component ?? null} />
            <Module title="Motherboard unit details" subtitle="Specify details for a new motherboard unit.">
                <Content>
                    <Row>
                        <MotherboardChipsetComboBox grow selectedKey={chipsetID} onSelectionChange={setChipsetID} defaultItems={params?.chipsets} />
                        <MotherboardFormFactorComboBox grow selectedKey={formFactorID} onSelectionChange={setFormFactorID} defaultItems={params?.formFactors} />
                    </Row>
                    <Row>
                        <MemoryFormFactorComboBox label="Memory form factor" selectedKey={memoryFormFactorID} onSelectionChange={setMemoryFormFactorID} defaultItems={params?.memoryFormFactors} />
                        <MemoryTypeComboBox label="Memory type" selectedKey={memoryTypeID} onSelectionChange={setMemoryTypeID} defaultItems={params?.memoryTypes} />
                    </Row>
                    <Row>
                        <NumberField isRequired grow label="Memory slots" value={memorySlotCount} onChange={setMemorySlotCount} />
                        <NumberField isRequired grow label="Memory capacity (GB)" value={memoryTotalCapacity} onChange={setMemoryTotalCapacity} />
                    </Row>
                    <Row>
                        <NumberField label="Maximum # of memory channels" isRequired grow value={channelCount} onChange={setChannelCount} />
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
                    <MotherboardConnectorsTableBuilder compatibleConnectors={unitIOConnectors} setCompatibleConnectors={setUnitIOConnectors} connectors={params?.ioConnectors} counterRef={counterRef} />
                </Content>
            </Module>
            <Module title="Motherboard unit power supply connectors" subtitle="Specify this motherboard unit's power supply connections">
                <Content>
                    <MotherboardConnectorsTableBuilder compatibleConnectors={unitPowerSupplyConnectors} setCompatibleConnectors={setUnitPowerSupplyConnectors} connectors={params?.powerSupplyConnectors} counterRef={counterRef} />
                </Content>
            </Module>
            <Module title="Motherboard unit PCIe slots" subtitle="Specify this motherboard unit's available PCIe slots">
                <Content>
                    <MotherboardSlotsTreeBuilder slots={pcieSlots} setSlots={setPcieSlots} coreFamilies={params?.coreFamilies}
                                                 processors={params?.processors} series={params?.series} slotList={params?.pcieSlots}  />
                </Content>
            </Module>
        </PostBody>
    )
}