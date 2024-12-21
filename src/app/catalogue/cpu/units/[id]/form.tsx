'use client';
import {PutFormProps} from '@/server/models'
import { CentralProcessor } from '@/server/models/catalogue';
import {Content, Grid, Module, PostBody, PutBody, Row} from '@/components/catalogue/views/item-view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useReducer, useState} from 'react';
import {
    ComponentModule,
    componentModuleReducer, transformComponentToDbo
} from '@/components/catalogue/views/forms';
import {Checkbox} from '@/components/ui/checkbox';
import {
    CentralProcessorCoreFamilyComboBox,
    CentralProcessorSeriesComboBox,
    CentralProcessorSocketComboBox
} from '@/components/catalogue/views/forms/central-processor';

export function Form({item, action, params}: PutFormProps<CentralProcessor.UnitDto, CentralProcessor.UnitDbo, CentralProcessor.UnitParams>) {

    const [componentState, componentDispatch] = useReducer(componentModuleReducer, transformComponentToDbo(item?.component))

    const [ socketID, setSocketID ] = useState<number | null>(item?.socket.id ?? null);
    const [ seriesID, setSeriesID ] = useState<number | null>(item?.series.id ?? null);
    const [ coreFamilyID, setCoreFamilyID ] = useState<number | null>(item?.coreFamily.id ?? null);
    const [ channelCount, setChannelCount ] = useState<number | null>(item?.channelCount ?? null);
    const [ maxTotalMemoryCapacity, setMaxTotalMemoryCapacity ] = useState<number | null>(item?.maxTotalMemoryCapacity ?? null);
    const [ performanceCoreCount, setPerformanceCoreCount ] = useState<number | null>(item?.performanceCoreCount ?? null);
    const [ threadCount, setThreadCount ] = useState<number | null>(item?.threadCount ?? null);
    const [ totalPower, setTotalPower ] = useState<number | null>(item?.totalPower ?? null);
    const [ hasIntegratedGraphics, setHasIntegratedGraphics ] = useState<boolean>(item?.hasIntegratedGraphics ?? false)
    const [ coolerIncluded, setCoolerIncluded ] = useState<boolean>(item?.coolerIncluded ?? false)
    const [ supportECCMemory, setSupportECCMemory ] = useState<boolean>(item?.supportECCMemory ?? false)
    const [ supportNonECCMemory, setSupportNonECCMemory ] = useState<boolean>(item?.supportNonECCMemory ?? false)
    const [ supportBufferedMemory, setSupportBufferedMemory ] = useState<boolean>(item?.supportBufferedMemory ?? false)
    const [ supportUnbufferedMemory, setSupportUnbufferedMemory ] = useState<boolean>(item?.supportUnbufferedMemory ?? false)

    const [ performanceCoreClock, setPerformanceCoreClock ] = useState<number | null>(item?.performanceCoreClock ?? null)
    const [ performanceCoreBoostClock, setPerformanceCoreBoostClock ] = useState<number | null>(item?.performanceCoreBoostClock ?? null)
    const [ hasEfficiencyCores, setHasEfficiencyCores ] = useState<boolean>(item?.hasEfficiencyCores ?? false)
    const [ efficiencyCoreCount, setEfficiencyCoreCount ] = useState<number | null>(item?.efficiencyCoreCount ?? null);
    const [ efficiencyCoreClock, setEfficiencyCoreClock ] = useState<number | null>(item?.efficiencyCoreClock ?? null)
    const [ efficiencyCoreBoostClock, setEfficiencyCoreBoostClock ] = useState<number | null>(item?.efficiencyCoreBoostClock ?? null)
    const [ l2Cache, setL2Cache ] = useState<number | null>(item?.l2Cache ?? null)
    const [ l3Cache, setL3Cache ] = useState<number | null>(item?.l3Cache ?? null)
    const [ simultaneousMultithreading, setSimultaneousMultithreading ] = useState<boolean>(item?.simultaneousMultithreading ?? false);

    console.log(item);
    return (
        <PutBody name="unit" submitAction={async () => await action({
            socketID, seriesID, coreFamilyID, channelCount, maxTotalMemoryCapacity, performanceCoreCount, threadCount, totalPower,
            hasIntegratedGraphics, coolerIncluded, supportECCMemory, supportNonECCMemory, supportBufferedMemory,
            supportUnbufferedMemory, performanceCoreClock, performanceCoreBoostClock, hasEfficiencyCores, efficiencyCoreCount,
            efficiencyCoreClock, efficiencyCoreBoostClock, l2Cache, l3Cache, simultaneousMultithreading,
            component: componentState
        })}>
            <ComponentModule state={componentState} dispatch={componentDispatch} params={params?.component ?? null} />
            <Module title="Central processing unit details" subtitle="Modify details for this central processing unit.">
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
        </PutBody>
    )
}