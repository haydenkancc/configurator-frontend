'use client';
import {PutFormProps} from '@/server/models'
import {PowerSupply} from '@/server/models/catalogue';
import {Content, Module, PostBody, PutBody, Row} from '@/components/catalogue/views/item-view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useReducer, useRef, useState} from 'react';
import {
    ComponentModule,
    componentModuleReducer,
    IOConnectorsTableBuilder,
    MemoryFormFactorComboBox,
    MemoryTypeComboBox,
    transformComponentToDbo,
    transformIOConnectorsTableToDbo,
    transformIOConnectorsDtoToDbo,
    PowerSupplyFormFactorComboBox,
    PowerSupplyEfficiencyRatingComboBox,
    PowerSupplyModularityComboBox,
    PowerSupplyUnitConnectorsTableBuilder,
    transformPowerSupplyUnitConnectorsTableToDbo, transformPowerSupplyUnitConnectorsDtoToDbo
} from '@/components/catalogue/views/forms';
import {Checkbox} from '@/components/ui/checkbox';
import {useListData} from 'react-stately';

export function Form({item, action, params}: PutFormProps<PowerSupply.UnitDto, PowerSupply.UnitDbo, PowerSupply.UnitParams>) {

    const [componentState, componentDispatch] = useReducer(componentModuleReducer, transformComponentToDbo(item?.component))

    const [ formFactorID, setFormFactorID ] = useState<number | null>(item?.formFactor.id ?? null);
    const [ efficiencyRatingID, setEfficiencyRatingID ] = useState<number | null>(item?.efficiencyRating.id ?? null);
    const [ modularityID, setModularityID ] = useState<number | null>(item?.modularity.id ?? null);
    const [ totalPower, setTotalPower ] = useState<number | null>(item?.totalPower ?? null);
    const [ length, setLength ] = useState<number | null>(item?.length ?? null);
    const [ fanless, setFanless ] = useState(item?.fanless ?? false);

    const rowIdRef = useRef(0)

    const connectorList= useListData<{id: number} & PowerSupply.UnitConnectorDbo>({
        initialItems: transformPowerSupplyUnitConnectorsDtoToDbo(item?.connectors ?? null, rowIdRef)
    });

    return (
        <PutBody name="unit"
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
        </PutBody>
    )
}