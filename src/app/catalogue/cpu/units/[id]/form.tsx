'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps, PutFormProps, PutFormProps} from '@/server/models'
import {CentralProcessorUnit, CentralProcessorUnitDbo, CentralProcessorUnitParams} from '@/server/models/components';
import {ManufacturerComboBox} from '@/app/catalogue/ram/kits/fields';
import {NumberField} from '@/components/ui/number-field';
import {Checkbox} from '@/components/ui/checkbox';
import {
    ChannelComboBox,
    CoreFamilyComboBox,
    MemoryCapacityComboBox,
    SeriesComboBox,
    SocketComboBox
} from '@/app/catalogue/cpu/units/fields';

export function Form({item, action, params}: PutFormProps<CentralProcessorUnit, CentralProcessorUnitDbo, CentralProcessorUnitParams>) {

    console.log(params)

    const [ sku, setSKU ] = useState<string | undefined>(item?.sku);
    const [ name, setName ] = useState<string | undefined>(item?.name);
    const [ displayName, setDisplayName ] = useState<string | undefined>(item?.displayName);
    const [ regularPrice, setRegularPrice ] = useState<number | undefined>(item?.regularPrice);
    const [ salePrice, setSalePrice ] = useState<number | undefined>(item?.salePrice);
    const [ onSale, setOnSale ] = useState<boolean | undefined>(item?.onSale);
    const [ saleable, setSaleable ] = useState<boolean | undefined>(item?.saleable);
    const [ manufacturerID, setManufacturerID ] = useState<number | undefined>(item?.manufacturer.id);

    const [ socketID, setSocketID ] = useState<number | undefined>()
    const [ seriesID, setSeriesID ] = useState<number | undefined>()
    const [ channelID, setChannelID ] = useState<number | undefined>()
    const [ coreFamilyID, setCoreFamilyID ] = useState<number | undefined>()
    const [ maxTotalMemoryCapacityID, setMaxTotalMemoryCapacityID ] = useState<number | undefined>()
    const [ totalPower, setTotalPower ] = useState<number | undefined>()
    const [ hasIntegratedGraphics, setHasIntegratedGraphics ] = useState<boolean>()
    const [ coolerIncluded, setCoolerIncluded ] = useState<boolean>()
    const [ supportECCMemory, setSupportECCMemory ] = useState<boolean>()
    const [ supportNonECCMemory, setSupportNonECCMemory ] = useState<boolean>()
    const [ supportBufferedMemory, setSupportBufferedMemory ] = useState<boolean>()
    const [ supportUnbufferedMemory, setSupportUnbufferedMemory ] = useState<boolean>()
    const [ coreCount, setCoreCount ] = useState<number | undefined>()

    const [ performanceCoreClock, setPerformanceCoreClock ] = useState<number | undefined>()
    const [ performanceCoreBoostClock, setPerformanceCoreBoostClock ] = useState<number | undefined>()
    const [ hasEfficiencyCores, setHasEfficiencyCores ] = useState<boolean>()
    const [ efficiencyCoreClock, setEfficiencyCoreClock ] = useState<number | undefined>()
    const [ efficiencyCoreBoostClock, setEfficiencyCoreBoostClock ] = useState<number | undefined>()
    const [ l2Cache, setL2Cache ] = useState<number | undefined>()
    const [ l3Cache, setL3Cache ] = useState<number | undefined>()
    const [ simultaneousMultithreading, setSimultaneousMultithreading ] = useState<boolean>()

    return (
        <PostBody name="unit" submitAction={async () => await action({name})}>
            <Module title="General component information" subtitle="Provide general information about this component.">
                <Content>
                    <Row>
                        <TextField label="SKU" value={sku} onChange={setSKU} grow isRequired />
                    </Row>
                    <Row>
                        <TextField label="Name" onChange={setName} grow isRequired />
                    </Row>
                    <Row>
                        <TextField label="Display name" onChange={setDisplayName} grow isRequired />
                    </Row>
                    <Row>
                        <ManufacturerComboBox grow onSelectionChange={(key) => setManufacturerID(key as number)} defaultItems={params?.manufacturers} />
                    </Row>
                    <Row>
                        <NumberField label="Price ($)" grow isRequired onChange={setRegularPrice} />
                        <NumberField label="Sale price ($)" grow onChange={setSalePrice} />
                    </Row>
                    <Row>
                        <Checkbox onChange={setOnSale}>On sale</Checkbox>
                        <Checkbox onChange={setSaleable}>Saleable</Checkbox>
                    </Row>
                </Content>
            </Module>
            <Module title="Central processing unit details" subtitle="Specify details for a new central processing unit.">
                <Content>
                    <Row>
                        <SocketComboBox defaultItems={params?.sockets} selectedKey={socketID} onSelectionChange={(key) => setSocketID(key as number)} />
                    </Row>
                    <Row>
                        <SeriesComboBox defaultItems={params?.series} selectedKey={seriesID} onSelectionChange={(key) => setSeriesID(key as number)} />
                    </Row>
                    <Row>
                        <ChannelComboBox defaultItems={params?.channels} selectedKey={channelID} onSelectionChange={(key) => setChannelID(key as number)} />
                    </Row>
                    <Row>
                        <CoreFamilyComboBox defaultItems={params?.coreFamilies} selectedKey={coreFamilyID} onSelectionChange={(key) => setCoreFamilyID(key as number)} />
                    </Row>
                    <Row>
                        <MemoryCapacityComboBox defaultItems={params?.memoryCapacities} selectedKey={maxTotalMemoryCapacityID} onSelectionChange={(key) => setMaxTotalMemoryCapacityID} />
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}