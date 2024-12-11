'use client'
import {Content, Grid, Module, PostBody, Row} from '@/app/catalogue/_templates/view';

import {TextField} from '@/components/ui/text-field';
import {useReducer, useState} from 'react';
import {PostFormProps} from '@/server/models'
import {CentralProcessorUnitDbo, CentralProcessorUnitParams, ComponentDbo} from '@/server/models/components';
import {NumberField} from '@/components/ui/number-field';
import {Checkbox} from '@/components/ui/checkbox';
import {
    CentralProcessorChannelComboBox,
    CentralProcessorCoreFamilyComboBox,
    CentralProcessorSeriesComboBox,
    CentralProcessorSocketComboBox,
    ComponentModule,
    componentModuleReducer,
    MemoryCapacityComboBox
} from '@/app/catalogue/_templates/forms';

export function Form({action, params}: PostFormProps<CentralProcessorUnitDbo, CentralProcessorUnitParams>) {

    const [componentState,componentDispatch]
        = useReducer(componentModuleReducer, { onSale: false, saleable: true })

    const [ socketID, setSocketID ] = useState<number | undefined>()
    const [ seriesID, setSeriesID ] = useState<number | undefined>()
    const [ coreFamilyID, setCoreFamilyID ] = useState<number | undefined>()
    const [ channelID, setChannelID ] = useState<number | undefined>()
    const [ maxTotalMemoryCapacityID, setMaxTotalMemoryCapacityID ] = useState<number | undefined>()
    const [ coreCount, setCoreCount ] = useState<number | undefined>()
    const [ threadCount, setThreadCount ] = useState<number | undefined>();
    const [ totalPower, setTotalPower ] = useState<number | undefined>()
    const [ hasIntegratedGraphics, setHasIntegratedGraphics ] = useState<boolean | undefined>(false)
    const [ coolerIncluded, setCoolerIncluded ] = useState<boolean | undefined>(false)
    const [ supportECCMemory, setSupportECCMemory ] = useState<boolean | undefined>(false)
    const [ supportNonECCMemory, setSupportNonECCMemory ] = useState<boolean | undefined>(false)
    const [ supportBufferedMemory, setSupportBufferedMemory ] = useState<boolean | undefined>(false)
    const [ supportUnbufferedMemory, setSupportUnbufferedMemory ] = useState<boolean | undefined>(false)

    const [ performanceCoreClock, setPerformanceCoreClock ] = useState<number | undefined>()
    const [ performanceCoreBoostClock, setPerformanceCoreBoostClock ] = useState<number | undefined>()
    const [ hasEfficiencyCores, setHasEfficiencyCores ] = useState<boolean | undefined>(false)
    const [ efficiencyCoreClock, setEfficiencyCoreClock ] = useState<number | undefined>()
    const [ efficiencyCoreBoostClock, setEfficiencyCoreBoostClock ] = useState<number | undefined>()
    const [ l2Cache, setL2Cache ] = useState<number | undefined>()
    const [ l3Cache, setL3Cache ] = useState<number | undefined>()
    const [ simultaneousMultithreading, setSimultaneousMultithreading ] = useState<boolean | undefined>(false)

    return (
        <PostBody name="unit" submitAction={async () => await action({
            socketID, seriesID, coreFamilyID, channelID, maxTotalMemoryCapacityID, coreCount, threadCount,  totalPower,
            hasIntegratedGraphics, coolerIncluded, supportECCMemory, supportNonECCMemory, supportBufferedMemory,
            supportUnbufferedMemory, performanceCoreClock, performanceCoreBoostClock, hasEfficiencyCores,
            efficiencyCoreClock, efficiencyCoreBoostClock, l2Cache, l3Cache, simultaneousMultithreading,
            component: componentState
        })}>
            <ComponentModule state={componentState} dispatch={componentDispatch} params={params?.component} />
            <Module title="Central processing unit details" subtitle="Specify details for a new central processing unit.">
                <Content>
                    <Row>
                        <NumberField label="Core count" grow isRequired value={coreCount} onChange={setCoreCount} />
                        <NumberField label="Thread count" grow isRequired value={threadCount} onChange={setThreadCount} />
                    </Row>
                    <Row>
                        <NumberField label="Performance core base clock (GHz)" grow step={0.1} formatOptions={{ minimumFractionDigits: 1, maximumFractionDigits: 2 }} isRequired value={performanceCoreClock} onChange={setPerformanceCoreClock} />
                        <NumberField label="Performance core boost clock (GHz)" grow step={0.1} formatOptions={{ minimumFractionDigits: 1, maximumFractionDigits: 2 }} isRequired value={performanceCoreBoostClock} onChange={setPerformanceCoreBoostClock} />
                    </Row>
                    <Row>
                        <Checkbox isSelected={hasEfficiencyCores} onChange={setHasEfficiencyCores}>Has efficiency cores</Checkbox>
                    </Row>
                    {hasEfficiencyCores &&
                        <Row>
                            <NumberField label="Efficency core base clock (GHz)" grow step={0.1} formatOptions={{ minimumFractionDigits: 1, maximumFractionDigits: 2 }} isRequired value={efficiencyCoreClock} onChange={setEfficiencyCoreClock} />
                            <NumberField label="Efficency core boost clock (GHz)" grow step={0.1} formatOptions={{ minimumFractionDigits: 1, maximumFractionDigits: 2 }} isRequired value={efficiencyCoreBoostClock} onChange={setEfficiencyCoreBoostClock} />
                        </Row>
                    }
                    <Row>
                        <NumberField label="L2 cache (MB)" grow step={0.1} isRequired value={l2Cache} onChange={setL2Cache}  />
                        <NumberField label="L3 cache (MB)" grow step={0.1} isRequired value={l3Cache} onChange={setL3Cache} />
                    </Row>
                    <Row>
                        <NumberField label="TDP (W)" grow isRequired value={totalPower} onChange={setTotalPower} />
                    </Row>
                    <Row>
                        <CentralProcessorSocketComboBox defaultItems={params?.sockets} selectedKey={socketID} onSelectionChange={(key) => setSocketID(key as number)} />
                    </Row>
                    <Row>
                        <CentralProcessorSeriesComboBox defaultItems={params?.series} selectedKey={seriesID} onSelectionChange={(key) => setSeriesID(key as number)} />
                        <CentralProcessorCoreFamilyComboBox defaultItems={params?.coreFamilies} selectedKey={coreFamilyID} onSelectionChange={(key) => setCoreFamilyID(key as number)} />
                    </Row>
                    <Row>
                        <CentralProcessorChannelComboBox defaultItems={params?.channels} selectedKey={channelID} onSelectionChange={(key) => setChannelID(key as number)} />
                        <MemoryCapacityComboBox label="Maximum memory capacity (GB)" defaultItems={params?.memoryCapacities} selectedKey={maxTotalMemoryCapacityID} onSelectionChange={(key) => setMaxTotalMemoryCapacityID(key as number)} />
                    </Row>
                    <Grid>
                        <Checkbox isSelected={supportECCMemory} onChange={setSupportECCMemory}>Supports ECC memory</Checkbox>
                        <Checkbox isSelected={supportNonECCMemory} onChange={setSupportNonECCMemory}>Supports non-ECC memory</Checkbox>
                        <Checkbox isSelected={supportBufferedMemory} onChange={setSupportBufferedMemory}>Supports buffered memory</Checkbox>
                        <Checkbox isSelected={supportUnbufferedMemory} onChange={setSupportUnbufferedMemory}>Supports unbuffered memory</Checkbox>
                        <Checkbox isSelected={hasIntegratedGraphics} onChange={setHasIntegratedGraphics}>Integrated graphics</Checkbox>
                        <Checkbox isSelected={simultaneousMultithreading} onChange={setSimultaneousMultithreading}>Simultaneous multithreading</Checkbox>
                        <Checkbox isSelected={coolerIncluded} onChange={setCoolerIncluded}>Cooler included</Checkbox>
                    </Grid>
                </Content>
            </Module>
        </PostBody>
    )
}