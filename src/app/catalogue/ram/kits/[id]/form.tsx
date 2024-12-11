'use client'
import {Content, Module, PostBody, PutBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useReducer, useState} from 'react';
import {PutFormProps} from '@/server/models'
import {MemoryKit, MemoryKitDbo, MemoryKitParams} from '@/server/models/components';
import {Key} from 'react-aria-components';
import {Checkbox} from '@/components/ui/checkbox';
import {NumberField} from '@/components/ui/number-field';
import {
    ComponentModule,
    componentModuleReducer,
    MemoryCapacityComboBox, MemoryFormFactorComboBox,
    MemoryTypeComboBox, TransformComponentToDbo
} from '@/app/catalogue/_templates/forms';

export function Form({item, action, params}: PutFormProps<MemoryKit, MemoryKitDbo, MemoryKitParams>) {

    const [componentState, componentDispatch] =
        useReducer(componentModuleReducer, TransformComponentToDbo(item?.component))


    const [ formFactorID, setFormFactorID ] = useState(item?.formFactor.id);
    const [ typeID, setTypeID ] = useState(item?.type.id);
    const [ capacityID, setCapacityID ] = useState(item?.capacity);
    const [ height, setHeight ] = useState(item?.height);
    const [ clockFrequency, setClockFrequency ] = useState(item?.clockFrequency);
    const [ isECC, setIsECC ] = useState(item?.isECC);
    const [ isBuffered, setIsBuffered ] = useState(item?.isBuffered);
    const [ moduleCount, setModuleCount ] = useState(item?.moduleCount);
    const [ casLatency, setCASLatency ] = useState(item?.casLatency);
    const [ firstWordLatency, setFirstWordLatency ] = useState(item?.firstWordLatency);
    const [ voltage, setVoltage ] = useState(item?.voltage);
    const [ timing, setTiming ] = useState(item?.timing);

    return (
        <PutBody name="kit"
                  submitAction={async () => await action({
                      formFactorID, typeID, capacityID, clockFrequency, height, isECC, isBuffered, moduleCount,
                      casLatency, firstWordLatency, voltage, timing,
                      component: componentState,
                  })}
        >
            <ComponentModule state={componentState} dispatch={componentDispatch} params={params?.component} />
            <Module title="Memory kit details" subtitle="Specify details for a new memory kit.">
                <Content>
                    <Row>
                        <NumberField isRequired value={moduleCount} onChange={setModuleCount} label="Number of modules"/>
                        <MemoryCapacityComboBox label="Capacity per module (GB)" selectedKey={capacityID} onSelectionChange={(key) => setCapacityID(key as number)} defaultItems={params?.capacities} />
                    </Row>
                    <Row>
                        <MemoryFormFactorComboBox selectedKey={formFactorID} onSelectionChange={(key) => setFormFactorID(key as number)} items={params?.formFactors} />
                    </Row>
                    <Row>
                        <MemoryTypeComboBox label="Type" selectedKey={typeID} onSelectionChange={(key) => setTypeID(key as number)} items={params?.types} />
                    </Row>
                    <Row>
                        <NumberField value={clockFrequency} onChange={setClockFrequency} label="Clock frequency (MHz)" grow isRequired />
                        <NumberField value={voltage} onChange={setVoltage} label="Voltage (V)" grow isRequired  />
                    </Row>
                    <Row>
                        <NumberField value={casLatency} onChange={setCASLatency} label="CAS latency (ns)" grow isRequired />
                        <NumberField value={firstWordLatency} onChange={setFirstWordLatency} label="First word latency (ns)" grow isRequired  />
                    </Row>
                    <Row>
                        <TextField value={timing} onChange={setTiming} label="Timing" grow isRequired />
                        <NumberField value={height} onChange={setHeight} label="Height (mm)" grow isRequired />
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