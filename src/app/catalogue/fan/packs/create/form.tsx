'use client'
import {Content, Module, PostBody, PutBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {useReducer, useRef, useState} from 'react';
import {PostFormProps} from '@/server/models'
import { Fan } from '@/server/models/catalogue';
import {
    ComponentModule,
    componentModuleReducer, FanSizeComboBox, IOConnectorsTableBuilder,
    MemoryFormFactorComboBox, MemoryTypeComboBox,
    transformComponentToDbo, transformIOConnectorsTableToDbo
} from '@/components/catalogue/views/forms';
import {Checkbox} from '@/components/ui/checkbox';
import {NumberField} from '@/components/ui/number-field';
import {useListData} from 'react-stately';

export function Form({action, params}: PostFormProps<Fan.PackDbo, Fan.PackParams>) {

    const [componentState, componentDispatch] = useReducer(componentModuleReducer, transformComponentToDbo())

    const [ quantity, setQuantity ] = useState<number | null>(null);
    const [ sizeID, setSizeID ] = useState<number | null>(null);
    const [ pwm, setPwm ] = useState(false);
    const [ airflow, setAirflow ] = useState<string>("");
    const [ noiseLevel, setNoiseLevel ] = useState<string>("");
    const [ staticPressure, setStaticPressure ] = useState<string>("");
    const [ rpm, setRpm ] = useState<string>("");

    const connectorList= useListData<{id: number} & Fan.PackConnectorDbo>({
    });

    const rowIdRef = useRef(0)

    return (
        <PostBody name="pack"
                  submitAction={async () => await action({
                      component: componentState,
                      connectors: transformIOConnectorsTableToDbo(connectorList),
                      quantity, sizeID, pwm, airflow, noiseLevel, staticPressure, rpm,
                  })}
        >
            <ComponentModule state={componentState} dispatch={componentDispatch} params={params?.component} />
            <Module title="Fan pack details" subtitle="Specify details for a new fan pack.">
                <Content>
                    <Row>
                        <NumberField isRequired grow label="Quantity" value={quantity} onChange={setQuantity} />
                        <FanSizeComboBox selectedKey={sizeID} onSelectionChange={setSizeID} defaultItems={params?.sizes}/>
                    </Row>
                    <Row>
                        <TextField isRequired grow label="Speed (RPM)" value={rpm} onChange={setRpm} />
                        <TextField isRequired grow label="Airflow (CFM)" value={airflow} onChange={setAirflow} />
                    </Row>
                    <Row>
                        <TextField isRequired grow label="Noise Level (dB)" value={noiseLevel} onChange={setNoiseLevel} />
                        <TextField isRequired grow label="Static pressure (mmH₂O)" value={staticPressure} onChange={setStaticPressure} />
                    </Row>
                    <Row>
                        <Checkbox isSelected={pwm} onChange={setPwm}>PWM</Checkbox>
                    </Row>
                </Content>
            </Module>
            <Module title="Fan pack connectors" subtitle="Specify which connectors this fan pack requires.">
                <Content>
                    <IOConnectorsTableBuilder rows={connectorList} connectors={params?.connectors} rowIdRef={rowIdRef} />
                </Content>
            </Module>
        </PostBody>
    )
}