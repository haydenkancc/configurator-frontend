'use client'

import {PCIeSlotParams} from '@/server/models/components';
import {Select, SelectItem, SelectProps} from '@/components/ui/select';


export function PCIeSizeSelect({...props}: SelectProps<PCIeSlotParams["sizes"][number]>) {
    return (
        <Select {...props} placeholder="Select a size">
            {size => <SelectItem id={size.laneCount} textValue={`${size.laneCount}`}>x{size.laneCount}</SelectItem>}
        </Select>
    )
}

export function PCIeVersionSelect({...props}: SelectProps<PCIeSlotParams["versions"][number]>) {
    return (
        <Select {...props} placeholder="Select a version">
            {version => <SelectItem>{version.name}</SelectItem>}
        </Select>
    )
}