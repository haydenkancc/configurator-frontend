'use client'
import {Content, Grid, Module, PostBody, PutBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {useReducer, useRef, useState} from 'react';
import {PostFormProps, RecursiveMap, RecursiveNullable} from '@/server/models'
import {GraphicsCard} from '@/server/models/catalogue';
import {
    ComponentModule,
    PcieExpansionCardModule,
    componentModuleReducer,
    transformComponentToDbo,
    pcieExpansionCardModuleReducer,
    transformPcieExpansionCardToDbo,
    GraphicsCardChipsetComboBox,
    MemoryTypeComboBox,
    GraphicsCardPowerConnectorConfigurationsTreeBuilder,
    transformGraphicsCardConfigurationsMapToDbo
} from '@/components/catalogue/views/forms';
import {Checkbox} from '@/components/ui/checkbox';
import {NumberField} from '@/components/ui/number-field';
import {useImmer} from 'use-immer';


export function Form({action, params}: PostFormProps<GraphicsCard.UnitDbo, GraphicsCard.UnitParams>) {

    const [componentState, componentDispatch] = useReducer(componentModuleReducer, transformComponentToDbo())
    const [expansionCardState, expansionCardDispatch] = useReducer(pcieExpansionCardModuleReducer, transformPcieExpansionCardToDbo())

    const [chipsetID, setChipsetID] = useState<number | null>(null);
    const [memoryCapacity, setMemoryCapacity] = useState<number | null>(null);
    const [memoryTypeID, setMemoryTypeID] = useState<number | null>(null);
    const [length, setLength] = useState<number | null>(null);
    const [width, setWidth] = useState<number | null>(null);
    const [height, setHeight] = useState<number | null>(null);
    const [totalSlotWidth, setTotalSlotWidth] = useState<number | null>(null);
    const [totalPower, setTotalPower] = useState<number | null>(null);
    const [recommendedPower, setRecommendedPower] = useState<number | null>(null);
    const [coreClock, setCoreClock] = useState<number | null>(null);
    const [boostClock, setBoostClock] = useState<number | null>(null);

    const [configurations, setConfigurations] = useImmer<RecursiveMap<RecursiveNullable<GraphicsCard.ConfigurationDbo>>>(new Map())
    const counterRef1 = useRef(0);
    const counterRef2 = useRef(0);

    return (
        <PostBody name="unit" submitAction={async () => {
              return await action({
                  component: componentState,
                  expansionCard: expansionCardState,
                  configurations: transformGraphicsCardConfigurationsMapToDbo(configurations),
                  chipsetID, memoryCapacity, memoryTypeID, length,
                  width, height, totalSlotWidth, totalPower, recommendedPower, coreClock, boostClock,
              })}}
        >
            <ComponentModule state={componentState} dispatch={componentDispatch} params={params?.component} />
            <PcieExpansionCardModule state={expansionCardState} dispatch={expansionCardDispatch} params={params?.expansionCard} />
            <Module title="Graphics card details" subtitle="Specify details for a new graphics card.">
                <Content>
                    <Row>
                        <GraphicsCardChipsetComboBox
                            selectedKey={chipsetID}
                            onSelectionChange={(key) => setChipsetID(key as number)}
                            defaultItems={params?.chipsets}
                        />
                    </Row>
                    <Row>
                        <NumberField
                            grow
                            isRequired
                            label="Memory capacity (GB)"
                            value={memoryCapacity}
                            onChange={setMemoryCapacity}
                        />
                        <MemoryTypeComboBox
                            label="Memory type"
                            selectedKey={memoryTypeID}
                            onSelectionChange={(key) => setMemoryTypeID(key as number)}
                            defaultItems={params?.memoryTypes}
                        />
                    </Row>
                    <Row>
                        <NumberField isRequired grow label="Core clock (MHz)" value={coreClock} onChange={setCoreClock} />
                        <NumberField isRequired grow label="Boost clock (MHz)" value={boostClock} onChange={setBoostClock} />
                    </Row>
                    <Row>
                        <NumberField isRequired grow label="TDP (W)" value={totalPower} onChange={setTotalPower} />
                        <NumberField isRequired grow label="Recommended Wattage (W)" value={recommendedPower} onChange={setRecommendedPower} />
                    </Row>
                    <Row>
                        <NumberField isRequired grow label="Total slot width" value={totalSlotWidth} onChange={setTotalSlotWidth} />
                    </Row>
                    <Row>
                        <NumberField isRequired grow label="Length (mm)" value={length} onChange={setLength} />
                        <NumberField isRequired grow label="Width (mm)" value={width} onChange={setWidth} />
                        <NumberField isRequired grow label="Height (mm)" value={height} onChange={setHeight} />
                    </Row>
                </Content>
            </Module>
            <Module title="Power connection configurations" subtitle="Specify power connector configurations that this graphics card can use.">
                <Content>
                    <GraphicsCardPowerConnectorConfigurationsTreeBuilder
                        counterRef1={counterRef1}
                        counterRef2={counterRef2}
                        configurations={configurations}
                        setConfigurations={setConfigurations}
                        connectors={params?.connectors}/>
                </Content>
            </Module>
        </PostBody>
    )
}