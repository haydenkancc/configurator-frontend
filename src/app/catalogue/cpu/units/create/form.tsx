'use client'
import {Content, Grid, Module, PostBody, PutBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {useReducer, useState} from 'react';
import {PostFormProps} from '@/server/models'
import {CentralProcessor} from '@/server/models/catalogue';
import {
    ComponentModule,
    componentModuleReducer,
    transformComponentToDbo
} from '@/components/catalogue/views/forms';
import {Checkbox} from '@/components/ui/checkbox';
import {NumberField} from '@/components/ui/number-field';
import {
    CentralProcessorCoreFamilyComboBox,
    CentralProcessorSeriesComboBox,
    CentralProcessorSocketComboBox
} from '@/components/catalogue/views/forms/central-processor';

export function Form({action, params}: PostFormProps<CentralProcessor.UnitDbo, CentralProcessor.UnitParams>) {

    const [componentState, componentDispatch] = useReducer(componentModuleReducer, transformComponentToDbo())


    const [ socketID, setSocketID ] = useState<number | null>(null)
    const [ seriesID, setSeriesID ] = useState<number | null>(null)
    const [ coreFamilyID, setCoreFamilyID ] = useState<number | null>(null)
    const [ channelCount, setChannelCount ] = useState<number | null>(null)
    const [ maxTotalMemoryCapacity, setMaxTotalMemoryCapacity ] = useState<number | null>(null)
    const [ performanceCoreCount, setPerformanceCoreCount ] = useState<number | null>(null)
    const [ threadCount, setThreadCount ] = useState<number | null>(null);
    const [ totalPower, setTotalPower ] = useState<number | null>(null)
    const [ hasIntegratedGraphics, setHasIntegratedGraphics ] = useState<boolean>(false)
    const [ coolerIncluded, setCoolerIncluded ] = useState<boolean>(false)
    const [ supportECCMemory, setSupportECCMemory ] = useState<boolean>(false)
    const [ supportNonECCMemory, setSupportNonECCMemory ] = useState<boolean>(false)
    const [ supportBufferedMemory, setSupportBufferedMemory ] = useState<boolean>(false)
    const [ supportUnbufferedMemory, setSupportUnbufferedMemory ] = useState<boolean>(false)

    const [ performanceCoreClock, setPerformanceCoreClock ] = useState<number | null>(null)
    const [ performanceCoreBoostClock, setPerformanceCoreBoostClock ] = useState<number | null>(null)
    const [ hasEfficiencyCores, setHasEfficiencyCores ] = useState<boolean>(false)
    const [ efficiencyCoreCount, setEfficiencyCoreCount ] = useState<number | null>(null);
    const [ efficiencyCoreClock, setEfficiencyCoreClock ] = useState<number | null>(null)
    const [ efficiencyCoreBoostClock, setEfficiencyCoreBoostClock ] = useState<number | null>(null)
    const [ l2Cache, setL2Cache ] = useState<number | null>(null)
    const [ l3Cache, setL3Cache ] = useState<number | null>(null)
    const [ simultaneousMultithreading, setSimultaneousMultithreading ] = useState<boolean>(false)

    return (
        <PostBody name="unit" submitAction={async () => await action({
            socketID, seriesID, coreFamilyID, channelCount, maxTotalMemoryCapacity, performanceCoreCount, threadCount,  totalPower,
            hasIntegratedGraphics, coolerIncluded, supportECCMemory, supportNonECCMemory, supportBufferedMemory,
            supportUnbufferedMemory, performanceCoreClock, performanceCoreBoostClock, hasEfficiencyCores, efficiencyCoreCount,
            efficiencyCoreClock, efficiencyCoreBoostClock, l2Cache, l3Cache, simultaneousMultithreading,
            component: componentState
        })}>
            <ComponentModule state={componentState} dispatch={componentDispatch} params={params?.component ?? null} />
            <Module title="Central processing unit details" subtitle="Specify details for a new central processing unit.">
                <Content>
                    <Row>
                        <NumberField label="Performance core count" grow isRequired value={performanceCoreCount} onChange={setPerformanceCoreCount} />
                    </Row>
                    <Row>
                        <NumberField label="Performance core base clock (GHz)" grow step={0.1} formatOptions={{ minimumFractionDigits: 1, maximumFractionDigits: 2 }} isRequired value={performanceCoreClock} onChange={setPerformanceCoreClock} />
                        <NumberField label="Performance core boost clock (GHz)" grow step={0.1} formatOptions={{ minimumFractionDigits: 1, maximumFractionDigits: 2 }} isRequired value={performanceCoreBoostClock} onChange={setPerformanceCoreBoostClock} />
                    </Row>
                    <Grid>
                        <Checkbox isSelected={hasEfficiencyCores} onChange={setHasEfficiencyCores}>Has efficiency cores</Checkbox>
                    </Grid>
                    {hasEfficiencyCores &&
                        <>
                            <Row>
                                <NumberField label="Efficiency core count" grow isRequired value={efficiencyCoreCount} minValue={0} step={1} onChange={setEfficiencyCoreCount} />
                            </Row>
                            <Row>
                                <NumberField label="Efficency core base clock (GHz)" grow step={0.1} formatOptions={{ minimumFractionDigits: 1, maximumFractionDigits: 2 }} isRequired value={efficiencyCoreClock} onChange={setEfficiencyCoreClock} />
                                <NumberField label="Efficency core boost clock (GHz)" grow step={0.1} formatOptions={{ minimumFractionDigits: 1, maximumFractionDigits: 2 }} isRequired value={efficiencyCoreBoostClock} onChange={setEfficiencyCoreBoostClock} />
                            </Row>
                        </>
                    }
                    <Row>
                        <NumberField label="Thread count" grow isRequired value={threadCount} onChange={setThreadCount} />
                    </Row>
                    <Row>
                    </Row>
                    <Row>
                        <NumberField label="L2 cache (MB)" grow step={0.1} isRequired value={l2Cache} onChange={setL2Cache}  />
                        <NumberField label="L3 cache (MB)" grow step={0.1} isRequired value={l3Cache} onChange={setL3Cache} />
                    </Row>
                    <Row>
                        <NumberField label="TDP (W)" grow isRequired value={totalPower} onChange={setTotalPower} />
                    </Row>
                    <Row>
                        <CentralProcessorSocketComboBox defaultItems={params?.sockets} selectedKey={socketID} onSelectionChange={setSocketID} />
                    </Row>
                    <Row>
                        <CentralProcessorSeriesComboBox defaultItems={params?.series} selectedKey={seriesID} onSelectionChange={setSeriesID} />
                        <CentralProcessorCoreFamilyComboBox defaultItems={params?.coreFamilies} selectedKey={coreFamilyID} onSelectionChange={(key) => setCoreFamilyID(key as number)} />
                    </Row>
                    <Row>
                        <NumberField label="Maximum # of memory channels" isRequired grow value={channelCount} onChange={setChannelCount} />
                        <NumberField label="Maximum memory capacity (GB)" isRequired grow value={maxTotalMemoryCapacity} onChange={setMaxTotalMemoryCapacity} />
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