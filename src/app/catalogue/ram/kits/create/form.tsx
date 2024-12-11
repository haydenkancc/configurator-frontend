'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useReducer, useState} from 'react';
import {PostFormProps} from '@/server/models'
import {MemoryKitDbo, MemoryKitParams} from '@/server/models/components';
import {Key} from 'react-aria-components';
import {Checkbox} from '@/components/ui/checkbox';
import {NumberField} from '@/components/ui/number-field';
import {
    ComponentModule,
    componentModuleReducer,
    MemoryCapacityComboBox, MemoryFormFactorComboBox,
    MemoryTypeComboBox
} from '@/app/catalogue/_templates/forms';

export function Form({action, params}: PostFormProps<MemoryKitDbo, MemoryKitParams>) {

    const
        [
            componentState,
            componentDispatch
        ] = useReducer(componentModuleReducer, { onSale: false, saleable: true })

    const [ formFactorID, setFormFactorID ] = useState<number>();
    const [ typeID, setTypeID ] = useState<number>();
    const [ capacityID, setCapacityID ] = useState<number>();
    const [ height, setHeight ] = useState<number>();
    const [ clockFrequency, setClockFrequency ] = useState<number>();
    const [ isECC, setIsECC ] = useState(false);
    const [ isBuffered, setIsBuffered ] = useState(false);
    const [ moduleCount, setModuleCount ] = useState<number>();
    const [ casLatency, setCASLatency ] = useState<number>();
    const [ firstWordLatency, setFirstWordLatency ] = useState<number>();
    const [ voltage, setVoltage ] = useState<number>();
    const [ timing, setTiming ] = useState<string>();

    return (
        <PostBody name="kit"
                  submitAction={async () => await action({
                      formFactorID, typeID, capacityID, clockFrequency, height, isECC, isBuffered, moduleCount,
                      casLatency, firstWordLatency, voltage, timing, component: componentState,
                  })}
        >
            <ComponentModule state={componentState} dispatch={componentDispatch} params={params?.component} />
            <Module title="Memory kit details" subtitle="Specify details for a new memory kit.">
                <Content>
                    <Row>
                        <NumberField isRequired onChange={setModuleCount} label="Number of modules"/>
                        <MemoryCapacityComboBox label="Capacity per module (GB)" onSelectionChange={(key) => setCapacityID(key as number)} defaultItems={params?.capacities} />
                    </Row>
                    <Row>
                        <MemoryFormFactorComboBox onSelectionChange={(key) => setFormFactorID(key as number)} items={params?.formFactors} />
                    </Row>
                    <Row>
                        <MemoryTypeComboBox label="Type" onSelectionChange={(key) => setTypeID(key as number)} defaultItems={params?.types} />
                    </Row>
                    <Row>
                        <NumberField onChange={setClockFrequency} label="Clock frequency (MHz)" grow isRequired />
                        <NumberField onChange={setVoltage} label="Voltage (V)" grow isRequired  />
                    </Row>
                    <Row>
                        <NumberField onChange={setCASLatency} label="CAS latency (ns)" grow isRequired />
                        <NumberField onChange={setFirstWordLatency} label="First word latency (ns)" grow isRequired  />
                    </Row>
                    <Row>
                        <TextField onChange={setTiming} label="Timing" grow isRequired />
                        <NumberField onChange={setHeight} label="Height (mm)" grow isRequired />
                    </Row>
                    <Row>
                        <Checkbox onChange={setIsECC}>ECC</Checkbox>
                        <Checkbox onChange={setIsBuffered}>Buffered</Checkbox>
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}