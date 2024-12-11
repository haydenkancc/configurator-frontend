'use client'
import {Content, Module, PostBody, PutBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useReducer, useRef, useState} from 'react';
import {PutFormProps} from '@/server/models'
import {
    FanPack,
    FanPackDbo,
    FanPackIOConnector,
    FanPackParams,
    MemoryKit,
    MemoryKitDbo,
    MemoryKitParams
} from '@/server/models/components';
import {Checkbox} from '@/components/ui/checkbox';
import {NumberField} from '@/components/ui/number-field';
import {
    ComponentModule,
    componentModuleReducer,
    FanSizeComboBox,
    IOConnectorsTableBuilder, TransformComponentToDbo
} from '@/app/catalogue/_templates/forms';
import {useListData} from 'react-stately';

export function Form({item, action, params}: PutFormProps<FanPack, FanPackDbo, FanPackParams>) {

    const [componentState, componentDispatch] =
        useReducer(componentModuleReducer, TransformComponentToDbo(item?.component))

    const [ quantity, setQuantity ] = useState<number | undefined>(item?.quantity);
    const [ sizeID, setSizeID ] = useState<number | undefined>(item?.size.id);
    const [ pwm, setPwm ] = useState(item?.pwm);
    const [ airflow, setAirflow ] = useState(item?.airflow);
    const [ noiseLevel, setNoiseLevel ] = useState(item?.noiseLevel);
    const [ staticPressure, setStaticPressure ] = useState(item?.staticPressure);
    const [ rpm, setRpm ] = useState(item?.rpm);

    const rowIdRef = useRef(0)

    const connectorList= useListData<{id: number} & FanPackIOConnector>({
        initialItems: item?.connectors.map((item) => ({ id: rowIdRef.current++, ...item })),
        getKey: (k) => k.id
    });


    return (
        <PutBody name="pack"
                  submitAction={async () => await action({
                      connectors: connectorList.items.map(({connectorID, connectorCount}) => ({connectorID, connectorCount})),
                      quantity, sizeID, pwm, airflow, noiseLevel, staticPressure, rpm, component: componentState
                  })}
        >
            <ComponentModule state={componentState} dispatch={componentDispatch} params={params?.component} />
            <Module title="Fan pack details" subtitle="Specify details for a new fan pack.">
                <Content>
                    <Row>
                        <NumberField isRequired grow label="Quantity" value={quantity} onChange={setQuantity} />
                        <FanSizeComboBox selectedKey={sizeID} onSelectionChange={(key) => setSizeID(key as number)} defaultItems={params?.sizes}/>
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
        </PutBody>
    )
}