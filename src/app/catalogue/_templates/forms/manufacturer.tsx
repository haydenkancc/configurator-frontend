import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import {Manufacturer} from '@/server/models/components';
import React from 'react';

export function ManufacturerComboBox({...props } : ComboBoxProps<Manufacturer>) {
    return (
        <ComboBox label="Manufacturer" isRequired {...props}>
            {manufacturer => (
                <ComboBoxItem>{manufacturer.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}