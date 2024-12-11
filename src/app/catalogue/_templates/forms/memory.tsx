import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import {MemoryCapacity, MemoryFormFactor, MemoryKitParams, MemoryType} from '@/server/models/components';
import React from 'react';
import {Select, SelectItem, SelectProps} from '@/components/ui/select';


export function MemoryTypeComboBox({...props } : ComboBoxProps<MemoryType>) {
    return (
        <ComboBox grow placeholder="Select a type" isRequired {...props}>
            {type => (
                <ComboBoxItem>{type.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function MemoryCapacityComboBox({...props} : ComboBoxProps<MemoryCapacity>) {
    return (
        <ComboBox placeholder="Select a capacity" grow isRequired {...props}>
            {capacity => (
                <ComboBoxItem id={capacity.size} textValue={`${capacity.size}`}>{capacity.size}</ComboBoxItem>
            )}
        </ComboBox>
    )
}


export function MemoryFormFactorComboBox({...props } : ComboBoxProps<MemoryFormFactor>) {
    return (
        <ComboBox label="Form factor" grow placeholder="Select a form factor" isRequired {...props}>
            {formFactor => (
                <ComboBoxItem id={formFactor.id}>{formFactor.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}
