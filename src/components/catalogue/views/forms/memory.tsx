import { Memory } from '@/server/models/catalogue';
import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';

export function MemoryTypeComboBox({...props } : ComboBoxProps<Memory.TypeDto>) {
    return (
        <ComboBox grow label="Type" placeholder="Select a type" isRequired {...props}>
            {type => (
                <ComboBoxItem>{type.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}


export function MemoryFormFactorComboBox({...props } : ComboBoxProps<Memory.FormFactorDto>) {
    return (
        <ComboBox label="Form factor" grow placeholder="Select a form factor" isRequired {...props}>
            {formFactor => (
                <ComboBoxItem id={formFactor.id}>{formFactor.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}