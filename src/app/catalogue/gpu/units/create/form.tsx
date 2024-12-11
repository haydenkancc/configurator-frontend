'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useReducer, useRef, useState} from 'react';
import {PostFormProps} from '@/server/models'
import {
    GraphicsProcessorUnitConfiguration,
    GraphicsProcessorUnitConfigurationListDataItem,
    GraphicsProcessorUnitConfigurationPowerSupplyConnectorListDataItem,
    GraphicsProcessorUnitDbo,
    GraphicsProcessorUnitParams
} from '@/server/models/components';
import {Checkbox} from '@/components/ui/checkbox';
import {NumberField} from '@/components/ui/number-field';
import {
    ComponentModule,
    componentModuleReducer,
    GraphicsProcessorChipsetComboBox,
    GraphicsProcessorPowerConnectorConfigurationTreeBuilder,
    MemoryCapacityComboBox,
    MemoryTypeComboBox,
    PCIeExpansionCardModule,
    PCIeExpansionCardModuleReducer,
    PowerSupplyConnectorComboBox,
} from '@/app/catalogue/_templates/forms';
import {useListData, useTreeData} from 'react-stately';
import { Button } from '@/components/ui/button';
import {Select, SelectItem} from '@/components/ui/select';
import {Plus, X} from '@phosphor-icons/react/dist/ssr';
import {
    TreeBuilder,
    TreeBuilderBranch,
    TreeBuilderDropdown,
    TreeBuilderDropdownCaret
} from '@/components/ui/tree-builder';
import {TreeNode} from '@react-stately/data';

export function Form({action, params}: PostFormProps<GraphicsProcessorUnitDbo, GraphicsProcessorUnitParams>) {

    const [componentState, componentDispatch]
        = useReducer(componentModuleReducer, { onSale: false, saleable: true })

    const [expansionCardState, expansionCardDispatch]
        = useReducer(PCIeExpansionCardModuleReducer, {})

    const [chipsetID, setChipsetID] = useState<number | undefined>();
    const [memoryCapacityID, setMemoryCapacityID] = useState<number | undefined>();
    const [memoryTypeID, setMemoryTypeID] = useState<number | undefined>();
    const [length, setLength] = useState<number | undefined>();
    const [width, setWidth] = useState<number | undefined>();
    const [height, setHeight] = useState<number | undefined>();
    const [totalSlotWidth, setTotalSlotWidth] = useState<number | undefined>();
    const [totalPower, setTotalPower] = useState<number | undefined>();
    const [recommendedPower, setRecommendedPower] = useState<number | undefined>();
    const [coreClock, setCoreClock] = useState<number | undefined>();
    const [boostClock, setBoostClock] = useState<number | undefined>();


    const configurationIdRef = useRef(0);
    const connectionIdRef = useRef(1);
    const configurations = useListData<GraphicsProcessorUnitConfigurationListDataItem>({
        initialItems: [
            {
                id: 0,
                name: 'Configuration A',
                open: true,
            }
        ],
        getKey: item => item.id,
    })

    const connections = useListData<GraphicsProcessorUnitConfigurationPowerSupplyConnectorListDataItem>({
        initialItems: [

        ]
    })

    return (
        <PostBody name="Graphics card"
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
        </PostBody>
    )
}