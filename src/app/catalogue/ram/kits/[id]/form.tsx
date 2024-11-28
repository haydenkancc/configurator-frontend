'use client'
import {Content, Module, PostBody, PutBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PutFormProps} from '@/server/models'
import {MemoryKit, MemoryKitDbo, MemoryKitParams} from '@/server/models/components';
import {Key} from 'react-aria-components';
import {FormFactorSelect, ManufacturerComboBox, SizeComboBox, TypeSelect} from '@/app/catalogue/ram/kits/fields';
import {Checkbox} from '@/components/ui/checkbox';
import {NumberField} from '@/components/ui/number-field';

export function Form({item, action, params}: PutFormProps<MemoryKit, MemoryKitDbo, MemoryKitParams>) {

    const [ sku, setSKU ] = useState(item?.sku);
    const [ name, setName ] = useState(item?.name);
    const [ displayName, setDisplayName ] = useState(item?.displayName);
    const [ regularPrice, setRegularPrice ] = useState(item?.regularPrice);
    const [ salePrice, setSalePrice ] = useState(item?.salePrice);
    const [ onSale, setOnSale ] = useState(item?.onSale);
    const [ saleable, setSaleable ] = useState(item?.saleable);
    const [ manufacturerID, setManufacturerID ] = useState(item?.manufacturer.id);


    const [ formFactorID, setFormFactorID ] = useState(item?.formFactor.id);
    const [ typeID, setTypeID ] = useState(item?.type.id);
    const [ capacityID, setCapacityID ] = useState(item?.capacity);
    const [ height, setHeight ] = useState(item?.height);
    const [ clockFrequency, setClockFrequency ] = useState(item?.clockFrequency);
    const [ isECC, setIsECC ] = useState(item?.isECC);
    const [ isBuffered, setIsBuffered ] = useState(item?.isBuffered);
    const [ moduleCount, setModuleCount ] = useState(item?.moduleCount);
    const [ casLatency, setCASLatency ] = useState(item?.casLatency);
    const [ firstWordLatency, setFirstWordLatency ] = useState(item?.firstWordLatency);
    const [ voltage, setVoltage ] = useState(item?.voltage);
    const [ timing, setTiming ] = useState(item?.timing);

    return (
        <PutBody name="kit"
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
                        <TextField label="Name" value={name} onChange={setName} grow isRequired />
                    </Row>
                    <Row>
                        <TextField label="Display name" value={displayName} onChange={setDisplayName} grow isRequired />
                    </Row>
                    <Row>
                        <ManufacturerComboBox grow selectedKey={manufacturerID} onSelectionChange={(key) => setManufacturerID(key as number)} defaultItems={params?.manufacturers} />
                    </Row>
                    <Row>
                        <NumberField label="Price ($)" grow isRequired value={regularPrice} onChange={setRegularPrice} />
                        <NumberField label="Sale price ($)" grow value={salePrice} onChange={setSalePrice} />
                    </Row>
                    <Row>
                        <Checkbox isSelected={onSale} onChange={setOnSale}>On sale</Checkbox>
                        <Checkbox isSelected={saleable} onChange={setSaleable}>Saleable</Checkbox>
                    </Row>
                </Content>
            </Module>
            <Module title="Memory kit details" subtitle="Specify details for a new memory kit.">
                <Content>
                    <Row>
                        <NumberField isRequired value={moduleCount} onChange={setModuleCount} label="Number of modules"/>
                        <SizeComboBox selectedKey={capacityID} onSelectionChange={(key) => setCapacityID(key as number)} defaultItems={params?.capacities} />
                    </Row>
                    <Row>
                        <FormFactorSelect selectedKey={formFactorID} onSelectionChange={(key) => setFormFactorID(key as number)} items={params?.formFactors} />
                    </Row>
                    <Row>
                        <TypeSelect selectedKey={typeID} onSelectionChange={(key) => setTypeID(key as number)} items={params?.types} />
                    </Row>
                    <Row>
                        <NumberField value={clockFrequency} onChange={setClockFrequency} label="Clock frequency (MHz)" grow isRequired />
                        <NumberField value={voltage} onChange={setVoltage} label="Voltage (V)" grow isRequired  />
                    </Row>
                    <Row>
                        <NumberField value={casLatency} onChange={setCASLatency} label="CAS latency (ns)" grow isRequired />
                        <NumberField value={firstWordLatency} onChange={setFirstWordLatency} label="First word latency (ns)" grow isRequired  />
                    </Row>
                    <Row>
                        <TextField value={timing} onChange={setTiming} label="Timing" grow isRequired />
                        <NumberField value={height} onChange={setHeight} label="Height (mm)" grow isRequired />
                    </Row>
                    <Row>
                        <Checkbox isSelected={isECC} onChange={setIsECC}>ECC</Checkbox>
                        <Checkbox isSelected={isBuffered} onChange={setIsBuffered}>Buffered</Checkbox>
                    </Row>
                </Content>
            </Module>
        </PutBody>
    )
}