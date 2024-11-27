'use client'
import {BackLink, Content, Controls, FormBody, Module, Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import NumberField from '@/components/ui/number-field';
import {Checkbox} from '@/components/ui/checkbox';
import {FormFactorSelect, ManufacturerComboBox, SizeComboBox, TypeSelect} from '@/app/catalogue/ram/kits/fields';
import {MemoryKitParams} from '@/server/models';
import {Key} from 'react-aria-components';

interface FormProps {
    kitParams?: MemoryKitParams
    action: (sku: string, name: string, displayName: string, regularPrice: number | null | undefined, salePrice: number | null, onSale: boolean, saleable: boolean, manufacturerID: Key | null, formFactorID: Key | null, typeID: Key | null, size: Key | null, height: number | null | undefined, clockFrequency: number | null | undefined, isECC: boolean, isBuffered: boolean, moduleCount: number | null | undefined, casLatency: number | null, firstWordLatency: number | null | undefined, voltage: number | null, timing: string) => Promise<void>
}

export function Form({ kitParams, action } : FormProps) {

    const [ sku, setSKU ] = useState('');
    const [ name, setName ] = useState('');
    const [ displayName, setDisplayName ] = useState('');
    const [ regularPrice, setRegularPrice ] = useState<number | null>();
    const [ salePrice, setSalePrice ] = useState<number | null>(0);
    const [ onSale, setOnSale ] = useState(false);
    const [ saleable, setSaleable ] = useState(false);
    const [ manufacturerID, setManufacturerID ] = useState<Key | null>(null);


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
        <FormBody onSubmit={async (e) =>
            {
                e.preventDefault();
                await action(sku, name, displayName, regularPrice, salePrice, onSale, saleable, manufacturerID, formFactorID,
                typeID, size, height, clockFrequency, isECC, isBuffered, moduleCount, casLatency, firstWordLatency, voltage, timing)
            }
        }
        >
            <Controls>
                <BackLink />
                <Button variant="primary" type="submit">
                    Create kit
                </Button>
            </Controls>
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
                        <ManufacturerComboBox grow onSelectionChange={setManufacturerID} defaultItems={kitParams?.manufacturers} />
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
                        <SizeComboBox onSelectionChange={setSize} defaultItems={kitParams?.sizes} />
                    </Row>
                    <Row>
                        <FormFactorSelect onSelectionChange={setFormFactorID} items={kitParams?.formFactors} />
                    </Row>
                    <Row>
                        <TypeSelect onSelectionChange={setTypeID} items={kitParams?.types} />
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
        </FormBody>
    )
}