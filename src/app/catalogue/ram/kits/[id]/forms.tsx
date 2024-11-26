'use client';
import {MemoryKit, MemoryKitParams, MemoryType} from '@/server/models';
import {Content, Footer, FormModule, Row} from '@/app/catalogue/_templates/view';
import NumberField from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import {FormFactorSelect, ManufacturerComboBox, SizeComboBox, TypeSelect} from '@/app/catalogue/ram/kits/fields';
import {Checkbox} from '@/components/ui/checkbox';
import {Key} from 'react-aria-components';


interface ComponentProps {
    kitParams?: MemoryKitParams;
    kit: MemoryKit;
    action: (sku: string, name: string, displayName: string, regularPrice: number | null | undefined, salePrice: number | null, onSale: boolean, saleable: boolean, manufacturerID: Key | null) => Promise<void>;
}

export function Component({ kitParams, kit, action } : ComponentProps) {

    const [ sku, setSKU ] = useState('');
    const [ name, setName ] = useState('');
    const [ displayName, setDisplayName ] = useState('');
    const [ regularPrice, setRegularPrice ] = useState<number | null>();
    const [ salePrice, setSalePrice ] = useState<number | null>(0);
    const [ onSale, setOnSale ] = useState(false);
    const [ saleable, setSaleable ] = useState(false);
    const [ manufacturerID, setManufacturerID ] = useState<Key | null>(null);

    return (
        <FormModule title="General component information" subtitle="View and modify general information about this component." action={async() => action(sku, name, displayName, regularPrice, salePrice, onSale, saleable, manufacturerID)}>
            <Content>
                <Content>
                    <Row>
                        <TextField label="SKU" defaultValue={kit.sku} onChange={setSKU} grow isRequired />
                    </Row>
                    <Row>
                        <TextField label="Name" defaultValue={kit.name} onChange={setName} grow isRequired />
                    </Row>
                    <Row>
                        <TextField label="Display name" defaultValue={kit.displayName} onChange={setDisplayName} grow isRequired />
                    </Row>
                    <Row>
                        <ManufacturerComboBox grow onSelectionChange={setManufacturerID} defaultSelectedKey={kit.manufacturer.id} defaultItems={kitParams?.manufacturers} />
                    </Row>
                    <Row>
                        <NumberField label="Price ($)" grow isRequired onChange={setRegularPrice} defaultValue={kit.regularPrice}/>
                        <NumberField label="Sale price ($)" grow onChange={setSalePrice} defaultValue={kit.salePrice}/>
                    </Row>
                    <Row>
                        <Checkbox onChange={setOnSale} defaultSelected={kit.onSale}>On sale</Checkbox>
                        <Checkbox onChange={setSaleable} defaultSelected={kit.saleable}>Saleable</Checkbox>
                    </Row>
                </Content>
            </Content>
            <Footer>
                <Button type="reset" variant="neutral">
                    Cancel
                </Button>
                <Button type="submit" variant="primary">
                    Save changes
                </Button>
            </Footer>
        </FormModule>
    )
}

interface KitProps {
    kitParams ? : MemoryKitParams;
    kit: MemoryKit;
    action: (formFactorID: Key | null, typeID: Key | null, size: Key | null, height: number | null | undefined, clockFrequency: number | null | undefined, isECC: boolean, isBuffered: boolean, moduleCount: number | null | undefined, casLatency: number | null, firstWordLatency: number | null | undefined, voltage: number | null, timing: string) => Promise<void>
}


export function Kit({ kitParams, kit, action } : KitProps) {

    const [ formFactorID, setFormFactorID ] = useState<Key | null>(null);
    const [ typeID, setTypeID ] = useState<Key | null>(null);
    const [ size, setSize ] = useState<Key | null>(null);
    const [ height, setHeight ] = useState<number | null>();
    const [ clockFrequency, setClockFrequency ] = useState<number | null>();
    const [ isECC, setIsECC ] = useState(false);
    const [ isBuffered, setIsBuffered ] = useState(false);
    const [ moduleCount, setModuleCount ] = useState<number | null>();
    const [ casLatency, setCASLatency ] = useState<number | null>(0);
    const [ firstWordLatency, setFirstWordLatency ] = useState<number | null>();
    const [ voltage, setVoltage ] = useState<number | null>(0);
    const [ timing, setTiming ] = useState('');

    return (
        <FormModule title="Memory kit details" subtitle="View and modify this memory kit's details." action={async () => action(formFactorID,
            typeID, size, height, clockFrequency, isECC, isBuffered, moduleCount, casLatency, firstWordLatency, voltage, timing)}>
            <Content>
                <Row>
                    <NumberField defaultValue={kit.moduleCount} isRequired onChange={setModuleCount} label="Number of modules" />
                    <SizeComboBox defaultSelectedKey={kit.size} onSelectionChange={setSize} defaultItems={kitParams?.sizes} />
                </Row>
                <Row>
                    <FormFactorSelect defaultSelectedKey={kit.formFactor.id} onSelectionChange={setFormFactorID} items={kitParams?.formFactors} />
                </Row>
                <Row>
                    <TypeSelect defaultSelectedKey={kit.type.id} onSelectionChange={setTypeID} items={kitParams?.types} />
                </Row>
                <Row>
                    <NumberField defaultValue={kit.clockFrequency} onChange={setClockFrequency} label="Clock frequency (MHz)" grow isRequired />
                    <NumberField defaultValue={kit.voltage} onChange={setVoltage} label="Voltage (V)" grow isRequired  />
                </Row>
                <Row>
                    <NumberField defaultValue={kit.casLatency} onChange={setCASLatency} label="CAS latency (ns)" grow isRequired />
                    <NumberField defaultValue={kit.firstWordLatency} onChange={setFirstWordLatency} label="First word latency (ns)" grow isRequired  />
                </Row>
                <Row>
                    <TextField defaultValue={kit.timing} onChange={setTiming} label="Timing" grow isRequired />
                    <NumberField defaultValue={kit.height} onChange={setHeight} label="Height (mm)" grow isRequired />
                </Row>
                <Row>
                    <Checkbox defaultSelected={kit.isECC} onChange={setIsECC}>ECC</Checkbox>
                    <Checkbox defaultSelected={kit.isBuffered} onChange={setIsBuffered}>Buffered</Checkbox>
                </Row>
            </Content>
            <Footer>
                <Button type="reset" variant="neutral">
                    Cancel
                </Button>
                <Button type="submit" variant="primary">
                    Save changes
                </Button>
            </Footer>
        </FormModule>
    )
}