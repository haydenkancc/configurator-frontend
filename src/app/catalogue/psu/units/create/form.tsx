'use client'
import {Content, Module, PostBody, PutBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {useReducer, useRef, useState} from 'react';
import {PostFormProps} from '@/server/models'
import { PowerSupply } from '@/server/models/catalogue';
import {
    ComponentModule,
    componentModuleReducer,
    transformComponentToDbo,
    PowerSupplyUnitConnectorsTableBuilder,
    PowerSupplyModularityComboBox,
    PowerSupplyEfficiencyRatingComboBox,
    PowerSupplyFormFactorComboBox,
    transformPowerSupplyUnitConnectorsTableToDbo
} from '@/components/catalogue/views/forms';
import {Checkbox} from '@/components/ui/checkbox';
import {NumberField} from '@/components/ui/number-field';
import {useListData} from 'react-stately';

export function Form({action, params}: PostFormProps<PowerSupply.UnitDbo, PowerSupply.UnitParams>) {

    const [componentState, componentDispatch] = useReducer(componentModuleReducer, transformComponentToDbo())

    const [ formFactorID, setFormFactorID ] = useState<number | null>(null);
    const [ efficiencyRatingID, setEfficiencyRatingID ] = useState<number | null>(null);
    const [ modularityID, setModularityID ] = useState<number | null>(null);
    const [ totalPower, setTotalPower ] = useState<number | null>(null);
    const [ length, setLength ] = useState<number | null>(null);
    const [ fanless, setFanless ] = useState(false);

    const connectorList= useListData<{id: number} & PowerSupply.UnitConnectorDbo>({});

    const rowIdRef = useRef(0)

    return (
        <PostBody name="unit"
                  submitAction={async () => await action({
                      connectors: transformPowerSupplyUnitConnectorsTableToDbo(connectorList),
                      component: componentState,
                      formFactorID, efficiencyRatingID, modularityID, totalPower, length, fanless,
                  })}
        >
            <ComponentModule state={componentState} dispatch={componentDispatch} params={params?.component} />
            <Module title="Power supply unit details" subtitle="Specify details for a new power supply unit.">
                <Content>
                    <Row>
                        <PowerSupplyFormFactorComboBox grow selectedKey={formFactorID} onSelectionChange={setFormFactorID} defaultItems={params?.formFactors} />
                    </Row>
                    <Row>
                        <PowerSupplyEfficiencyRatingComboBox grow selectedKey={efficiencyRatingID} onSelectionChange={setEfficiencyRatingID} defaultItems={params?.efficiencyRatings} />
                        <PowerSupplyModularityComboBox grow selectedKey={modularityID} onSelectionChange={setModularityID} defaultItems={params?.modularities} />
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
        </PostBody>
    )
}