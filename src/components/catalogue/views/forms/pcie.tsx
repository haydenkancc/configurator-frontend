import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import {Pcie} from '@/server/models/catalogue'
import {Combo} from 'next/dist/compiled/@next/font/dist/google';

export function PcieVersionComboBox({...props} : ComboBoxProps<Pcie.VersionDto>) {
    return (
        <ComboBox label="Version" placeholder="Select a version" isRequired {...props}>
            {version => <ComboBoxItem id={version.id}>{version.name}</ComboBoxItem>}
        </ComboBox>
    )
}

export function PcieSizeComboBox({...props} : ComboBoxProps<Pcie.SizeDto>) {
    return (
        <ComboBox label="Size" placeholder="Select a size" isRequired {...props}>
            {size => <ComboBoxItem id={size.id}>{`x${size.laneCount}`}</ComboBoxItem>}
        </ComboBox>
    )
}