'use client';
import {PutFormProps} from '@/server/models'
import {
    GraphicsProcessorUnit,
    GraphicsProcessorUnitConfigurationListDataItem, GraphicsProcessorUnitConfigurationPowerSupplyConnectorListDataItem,
    GraphicsProcessorUnitDbo, GraphicsProcessorUnitParams
} from '@/server/models/components';
import {Content, Module, PostBody, PutBody, Row} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useReducer, useRef, useState} from 'react';
import {
    ComponentModule,
    componentModuleReducer,
    GraphicsProcessorChipsetComboBox, GraphicsProcessorPowerConnectorConfigurationTreeBuilder,
    MemoryCapacityComboBox,
    MemoryTypeComboBox,
    PCIeExpansionCardModule,
    PCIeExpansionCardModuleReducer, TransformComponentToDbo, TransformPCIeExpansionCardToDbo
} from '@/app/catalogue/_templates/forms';
import {useListData} from 'react-stately';

export function Form({item, action, params}: PutFormProps<GraphicsProcessorUnit, GraphicsProcessorUnitDbo, GraphicsProcessorUnitParams>) {

    const [componentState, componentDispatch]
        = useReducer(componentModuleReducer, TransformComponentToDbo(item?.expansionCard.component));

    const [expansionCardState, expansionCardDispatch]
        = useReducer(PCIeExpansionCardModuleReducer, TransformPCIeExpansionCardToDbo(item?.expansionCard));

    const [chipsetID, setChipsetID] = useState<number | undefined>(item?.chipset.id);
    const [memoryCapacityID, setMemoryCapacityID] = useState<number | undefined>(item?.memoryCapacity);
    const [memoryTypeID, setMemoryTypeID] = useState<number | undefined>(item?.memoryType.id);
    const [length, setLength] = useState<number | undefined>(item?.length);
    const [width, setWidth] = useState<number | undefined>(item?.width);
    const [height, setHeight] = useState<number | undefined>(item?.height);
    const [totalSlotWidth, setTotalSlotWidth] = useState<number | undefined>(item?.totalSlotWidth);
    const [totalPower, setTotalPower] = useState<number | undefined>(item?.totalPower);
    const [recommendedPower, setRecommendedPower] = useState<number | undefined>(item?.recommendedPower);
    const [coreClock, setCoreClock] = useState<number | undefined>(item?.coreClock);
    const [boostClock, setBoostClock] = useState<number | undefined>(item?.boostClock);


    const configurationIdRef = useRef(0);
    const connectionIdRef = useRef(1);
    console.log(item?.configurations);

    const a = item?.configurations.reduce<[GraphicsProcessorUnitConfigurationListDataItem[], GraphicsProcessorUnitConfigurationPowerSupplyConnectorListDataItem[]]>(
        (accumulator, value) => {
            accumulator[0].push({
                id: ++configurationIdRef.current,
                name: 'Configuration' + String.fromCharCode(configurationIdRef.current + 65),
                open: true,
            });
            for (const connector of value.connectors) {
                accumulator[1].push({
                    id: ++connectionIdRef.current,
                    configurationID: configurationIdRef.current,
                    connectorID: connector.connectorID,
                    connectorCount: connector.connectorCount,

                })
            }
            return accumulator;

        },
        [[], []]
    );
    const configurations = useListData<GraphicsProcessorUnitConfigurationListDataItem>({
        initialItems: a ? a[0] : undefined,
        getKey: item => item.id,
    })

    const connections = useListData<GraphicsProcessorUnitConfigurationPowerSupplyConnectorListDataItem>({
        initialItems: a ? a[1] : undefined,
    })

    return (
        <PutBody name="Graphics card"
                  submitAction={async () => {

                      return await action({
                          configurations: configurations.items.map(({ id }) => ({
                              connectors: connections.items
                                  .filter(e => e.configurationID === id)
                                  .map(({ connectorID, connectorCount }) => ({ connectorID: connectorID as number, connectorCount: connectorCount as number}))
                          })),
                          expansionCard: {...expansionCardState, component: componentState}, chipsetID, memoryCapacityID, memoryTypeID, length,
                          width, height, totalSlotWidth, totalPower, recommendedPower, coreClock, boostClock,
                      })}}
        >
            <ComponentModule state={componentState} dispatch={componentDispatch} params={params?.expansionCard.component} />
            <PCIeExpansionCardModule state={expansionCardState} dispatch={expansionCardDispatch} params={params?.expansionCard} />
            <Module title="Graphics card details" subtitle="Specify details for a new graphics card.">
                <Content>
                    <Row>
                        <GraphicsProcessorChipsetComboBox
                            selectedKey={chipsetID}
                            onSelectionChange={(key) => setChipsetID(key as number)}
                            defaultItems={params?.chipsets}
                        />
                    </Row>
                    <Row>
                        <MemoryCapacityComboBox
                            label="Memory capacity (GB)"
                            selectedKey={memoryCapacityID}
                            onSelectionChange={(key) => setMemoryCapacityID(key as number)}
                            defaultItems={params?.memoryCapacities}
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
                    <GraphicsProcessorPowerConnectorConfigurationTreeBuilder
                        powerSupplyConnectors={params?.powerSupplyConnectors}
                        connections={connections}
                        configurations={configurations}
                        configurationIdRef={configurationIdRef}
                        connectionIdRef={connectionIdRef} />
                </Content>
            </Module>
        </PutBody>
    )
}