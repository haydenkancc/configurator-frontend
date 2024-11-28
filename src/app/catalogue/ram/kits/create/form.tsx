'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import {MemoryKitDbo, MemoryKitParams} from '@/server/models/components';
import {Key} from 'react-aria-components';
import {FormFactorSelect, ManufacturerComboBox, SizeComboBox, TypeSelect} from '@/app/catalogue/ram/kits/fields';
import {Checkbox} from '@/components/ui/checkbox';
import {NumberField} from '@/components/ui/number-field';

export function Form({action, params}: PostFormProps<MemoryKitDbo, MemoryKitParams>) {

    const [ sku, setSKU ] = useState<string | undefined>();
    const [ name, setName ] = useState<string | undefined>();
    const [ displayName, setDisplayName ] = useState<string | undefined>();
    const [ regularPrice, setRegularPrice ] = useState<number | undefined>();
    const [ salePrice, setSalePrice ] = useState<number | undefined>();
    const [ onSale, setOnSale ] = useState<boolean>(false);
    const [ saleable, setSaleable ] = useState<boolean>(false);
    const [ manufacturerID, setManufacturerID ] = useState<number | undefined>();


    const [ formFactorID, setFormFactorID ] = useState<number>();
    const [ typeID, setTypeID ] = useState<number>();
    const [ capacityID, setCapacityID ] = useState<number>();
    const [ height, setHeight ] = useState<number>();
    const [ clockFrequency, setClockFrequency ] = useState<number>();
    const [ isECC, setIsECC ] = useState(false);
    const [ isBuffered, setIsBuffered ] = useState(false);
    const [ moduleCount, setModuleCount ] = useState<number>();
    const [ casLatency, setCASLatency ] = useState<number>();
    const [ firstWordLatency, setFirstWordLatency ] = useState<number>();
    const [ voltage, setVoltage ] = useState<number>();
    const [ timing, setTiming ] = useState<string>();

    return (
        <PostBody name="kit"
                  submitAction={async () => await action({
                      sku, name, displayName, regularPrice, salePrice, onSale, saleable, manufacturerID,
                      formFactorID, typeID, capacityID, clockFrequency, height, isECC, isBuffered, moduleCount,
                      casLatency, firstWordLatency, voltage, timing
                  })}
        >
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
            <Module title="Memory kit details" subtitle="Specify details for a new memory kit.">
                <Content>
                    <Row>
                        <NumberField isRequired onChange={setModuleCount} label="Number of modules"/>
                        <SizeComboBox onSelectionChange={(key) => setCapacityID(key as number)} defaultItems={params?.capacities} />
                    </Row>
                    <Row>
                        <FormFactorSelect onSelectionChange={(key) => setFormFactorID(key as number)} items={params?.formFactors} />
                    </Row>
                    <Row>
                        <TypeSelect onSelectionChange={(key) => setTypeID(key as number)} items={params?.types} />
                    </Row>
                    <Row>
                        <NumberField onChange={setClockFrequency} label="Clock frequency (MHz)" grow isRequired />
                        <NumberField onChange={setVoltage} label="Voltage (V)" grow isRequired  />
                    </Row>
                    <Row>
                        <NumberField onChange={setCASLatency} label="CAS latency (ns)" grow isRequired />
                        <NumberField onChange={setFirstWordLatency} label="First word latency (ns)" grow isRequired  />
                    </Row>
                    <Row>
                        <TextField onChange={setTiming} label="Timing" grow isRequired />
                        <NumberField onChange={setHeight} label="Height (mm)" grow isRequired />
                    </Row>
                    <Row>
                        <Checkbox onChange={setIsECC}>ECC</Checkbox>
                        <Checkbox onChange={setIsBuffered}>Buffered</Checkbox>
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}