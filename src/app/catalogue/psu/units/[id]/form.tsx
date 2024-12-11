'use client'
import {Content, Module, PostBody, PutBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useReducer, useRef, useState} from 'react';
import {PostFormProps, PutFormProps} from '@/server/models'
import {
    PowerSupplyUnitDbo,
    PowerSupplyUnitConnector,
    PowerSupplyUnitParams,
    PowerSupplyUnit
} from '@/server/models/components';
import {Checkbox} from '@/components/ui/checkbox';
import {NumberField} from '@/components/ui/number-field';
import {
    ComponentModule,
    componentModuleReducer,
    PowerSupplyUnitConnectorsTableBuilder,
    PowerSupplyEfficiencyRatingComboBox,
    PowerSupplyFormFactorComboBox,
    PowerSupplyModularityComboBox, TransformComponentToDbo
} from '@/app/catalogue/_templates/forms';
import {useListData} from 'react-stately';

export function Form({item, action, params}: PutFormProps<PowerSupplyUnit, PowerSupplyUnitDbo, PowerSupplyUnitParams>) {

    const [componentState, componentDispatch] =
        useReducer(componentModuleReducer, TransformComponentToDbo(item?.component))

    const [ formFactorID, setFormFactorID ] = useState(item?.formFactor.id);
    const [ efficiencyRatingID, setEfficiencyRatingID ] = useState(item?.efficiencyRating.id);
    const [ modularityID, setModularityID ] = useState(item?.modularity.id);
    const [ totalPower, setTotalPower ] = useState(item?.totalPower);
    const [ length, setLength ] = useState(item?.length);
    const [ fanless, setFanless ] = useState(item?.fanless);

    const rowIdRef = useRef(0);

    const connectorList= useListData<{id: number} & PowerSupplyUnitConnector>({
        initialItems: item?.connectors.map((item) => ({ id: rowIdRef.current++, ...item })),
        getKey: (k) => k.id
    });


    return (
        <PutBody name="unit"
                  submitAction={async () => await action({
                      connectors: connectorList.items.map(({ id, ...item }) => ({...item})),
                      formFactorID, efficiencyRatingID, modularityID, totalPower, length, fanless, component: componentState,
                  })}
        >
            <ComponentModule state={componentState} dispatch={componentDispatch} params={params?.component} />
            <Module title="Power supply unit details" subtitle="Specify details for a new power supply unit.">
                <Content>
                    <Row>
                        <PowerSupplyFormFactorComboBox grow selectedKey={formFactorID} onSelectionChange={(key) => setFormFactorID(key as number)} defaultItems={params?.formFactors} />
                    </Row>
                    <Row>
                        <PowerSupplyEfficiencyRatingComboBox grow selectedKey={efficiencyRatingID} onSelectionChange={(key) => setEfficiencyRatingID(key as number)} defaultItems={params?.efficiencyRatings} />
                        <PowerSupplyModularityComboBox grow selectedKey={modularityID} onSelectionChange={(key) => setModularityID(key as number)} defaultItems={params?.modularities} />
                    </Row>
                    <Row>
                        <NumberField isRequired grow label="Wattage (W)" value={totalPower} onChange={setTotalPower} />
                        <NumberField isRequired grow label="Length (mm)" value={length} onChange={setLength} />
                    </Row>
                    <Row>
                        <Checkbox isSelected={fanless} onChange={setFanless}>Fanless</Checkbox>
                    </Row>
                </Content>
            </Module>
            <Module title="Power supply unit connectors" subtitle="Specify which connectors this power supply unit includes.">
                <Content>
                    <PowerSupplyUnitConnectorsTableBuilder rows={connectorList} connectors={params?.connectors} rowIdRef={rowIdRef} />
                </Content>
            </Module>
        </PutBody>
    )
}