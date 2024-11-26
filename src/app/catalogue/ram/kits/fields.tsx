import {Select, SelectProps} from '@/components/ui/select/select';
import {MemoryKitParams, PCIeSlotParams} from '@/server/models';
import SelectItem from '@/components/ui/select-item';
import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';


export function ManufacturerComboBox({...props } : ComboBoxProps<MemoryKitParams["manufacturers"][number]>) {
    return (
        <ComboBox label="Manufacturer" isRequired {...props}>
            {manufacturer => (
                <ComboBoxItem>{manufacturer.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function FormFactorSelect({...props } : SelectProps<MemoryKitParams["formFactors"][number]>) {
    return (
        <Select label="Form factor" grow placeholder="Select a form factor" isRequired {...props}>
            {formFactor => (
                <SelectItem>{formFactor.name}</SelectItem>
            )}
        </Select>
    )
}

export function TypeSelect({...props } : SelectProps<MemoryKitParams["types"][number]>) {
    return (
        <Select label="Type" grow placeholder="Select a type" isRequired {...props}>
            {type => (
                <SelectItem>{type.name}</SelectItem>
            )}
        </Select>
    )
}

export function SizeComboBox({...props} : ComboBoxProps<MemoryKitParams["sizes"][number]>) {
    return (
        <ComboBox label="Size per module (GB)" grow isRequired {...props}>
            {size => (
                <ComboBoxItem id={size.size} textValue={`${size.size}`}>{size.size}</ComboBoxItem>
            )}
        </ComboBox>
    )
}