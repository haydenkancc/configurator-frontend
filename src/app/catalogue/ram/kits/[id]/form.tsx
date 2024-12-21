'use client';
import {PutFormProps} from '@/server/models'
import { Memory } from '@/server/models/catalogue';
import {Content, Module, PostBody, PutBody, Row} from '@/components/catalogue/views/item-view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useReducer, useState} from 'react';
import {
    ComponentModule,
    componentModuleReducer, MemoryFormFactorComboBox, MemoryTypeComboBox, transformComponentToDbo
} from '@/components/catalogue/views/forms';
import {Checkbox} from '@/components/ui/checkbox';

export function Form({item, action, params}: PutFormProps<Memory.KitDto, Memory.KitDbo, Memory.KitParams>) {

    const [componentState, componentDispatch] = useReducer(componentModuleReducer, transformComponentToDbo(item?.component))

    const [ formFactorID, setFormFactorID ] = useState<number | null>(item?.formFactor.id ?? null);
    const [ typeID, setTypeID ] = useState<number | null>(item?.type.id ?? null);
    const [ capacity, setCapacity ] = useState<number | null>(item?.capacity ?? null);
    const [ height, setHeight ] = useState<number | null>(item?.height ?? null);
    const [ clockFrequency, setClockFrequency ] = useState<number | null>(item?.clockFrequency ?? null);
    const [ isECC, setIsECC ] = useState(item?.isECC ?? null);
    const [ isBuffered, setIsBuffered ] = useState(item?.isBuffered ?? null);
    const [ moduleCount, setModuleCount ] = useState<number | null>(item?.moduleCount ?? null);
    const [ casLatency, setCASLatency ] = useState<number | null>(item?.casLatency ?? null);
    const [ firstWordLatency, setFirstWordLatency ] = useState<number | null>(item?.firstWordLatency ?? null);
    const [ voltage, setVoltage ] = useState<number | null>(item?.voltage ?? null);
    const [ timing, setTiming ] = useState<string>(item?.timing ?? "");

    return (
        <PutBody name="kit" submitAction={async () => await action({
            formFactorID, typeID, capacity, clockFrequency, height, isECC, isBuffered, moduleCount,
            casLatency, firstWordLatency, voltage, timing, component: componentState,
        })}>
            <ComponentModule state={componentState} dispatch={componentDispatch} params={params?.component ?? null} />
            <Module title="Memory kit details" subtitle="Specify details for a new memory kit.">
                <Content>
                    <Row>
                        <NumberField grow isRequired value={moduleCount} onChange={setModuleCount} label="Number of modules" minValue={1} step={1} />
                        <NumberField grow label="Capacity per module (GB)" value={capacity} onChange={setCapacity} minValue={1} step={1} />
                    </Row>
                    <Row>
                        <MemoryFormFactorComboBox selectedKey={formFactorID} onSelectionChange={setFormFactorID} items={params?.formFactors} />
                    </Row>
                    <Row>
                        <MemoryTypeComboBox label="Type" selectedKey={typeID} onSelectionChange={setTypeID} defaultItems={params?.types} />
                    </Row>
                    <Row>
                        <NumberField value={clockFrequency} onChange={setClockFrequency} label="Clock frequency (MHz)" grow isRequired minValue={0} step={1} />
                        <NumberField value={voltage} onChange={setVoltage} label="Voltage (V)" grow isRequired minValue={0} />
                    </Row>
                    <Row>
                        <NumberField value={casLatency} onChange={setCASLatency} label="CAS latency (ns)" grow isRequired minValue={0} step={1} />
                        <NumberField value={firstWordLatency} onChange={setFirstWordLatency} label="First word latency (ns)" grow isRequired minValue={0} />
                    </Row>
                    <Row>
                        <TextField value={timing} onChange={setTiming} label="Timing" grow isRequired />
                        <NumberField value={height} onChange={setHeight} label="Height (mm)" grow isRequired minValue={0} />
                    </Row>
                    <Row>
                        <Checkbox isSelected={isECC} onChange={setIsECC}>ECC</Checkbox>
                        <Checkbox isSelected={isBuffered} onChange={setIsBuffered}>Buffered</Checkbox>
                    </Row>
                </Content>
            </Module>
        </PutBody>
    )
}