import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import {FanSize} from '@/server/models/components';
import React from 'react';

export function FanSizeComboBox({...props } : ComboBoxProps<FanSize>) {
    return (
        <ComboBox grow label="Fan size" isRequired {...props}>
            {size => (
                <ComboBoxItem textValue={`${size.size} mm`}>{size.size} mm</ComboBoxItem>
            )}
        </ComboBox>
    )
}

