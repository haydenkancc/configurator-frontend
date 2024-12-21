'use client'
import {Content, Module, PostBody, PutBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {useReducer, useState} from 'react';
import {PostFormProps} from '@/server/models'
import { Memory } from '@/server/models/catalogue';
import {
    ComponentModule,
    componentModuleReducer,
    MemoryFormFactorComboBox, MemoryTypeComboBox,
    transformComponentToDbo
} from '@/components/catalogue/views/forms';
import {Checkbox} from '@/components/ui/checkbox';
import {NumberField} from '@/components/ui/number-field';

export function Form({action, params}: PostFormProps<Memory.KitDbo, Memory.KitParams>) {

    const [componentState, componentDispatch] = useReducer(componentModuleReducer, transformComponentToDbo())

    const [ formFactorID, setFormFactorID ] = useState<number | null>(null);
    const [ typeID, setTypeID ] = useState<number | null>(null);
    const [ capacity, setCapacity ] = useState<number | null>(null);
    const [ height, setHeight ] = useState<number | null>(null);
    const [ clockFrequency, setClockFrequency ] = useState<number | null>(null);
    const [ isECC, setIsECC ] = useState(false);
    const [ isBuffered, setIsBuffered ] = useState(false);
    const [ moduleCount, setModuleCount ] = useState<number | null>(null);
    const [ casLatency, setCASLatency ] = useState<number | null>(null);
    const [ firstWordLatency, setFirstWordLatency ] = useState<number | null>(null);
    const [ voltage, setVoltage ] = useState<number | null>(null);
    const [ timing, setTiming ] = useState<string>("");

    return (
        <PostBody name="kit" submitAction={async () => await action({
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
        </PostBody>
    )
}