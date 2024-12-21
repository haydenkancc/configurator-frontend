import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import {Fan} from '@/server/models/catalogue'

export function FanSizeComboBox({...props } : ComboBoxProps<Fan.SizeDto>) {
    return (
        <ComboBox grow label="Fan size" isRequired {...props}>
            {size => (
                <ComboBoxItem textValue={`${size.sideLength} mm`}>{size.sideLength} mm</ComboBoxItem>
            )}
        </ComboBox>
    )
}