'use client'

import SelectItem from '@/components/ui/select-item';
import {PCIeSlotParams} from '@/server/models';
import {Select, SelectProps} from '@/components/ui/select/select';


export function PCIeSizeSelect( {...props } : SelectProps<PCIeSlotParams["sizes"][number]>) {
    return (
        <Select {...props}>
            {size => <SelectItem textValue={`${size.laneCount}`}>x{size.laneCount}</SelectItem>}
        </Select>
    )
}

export function PCIeVersionSelect( {...props } : SelectProps<PCIeSlotParams["versions"][number]>) {
    return (
        <Select {...props}>
            {version => <SelectItem>{version.name}</SelectItem>}
        </Select>
    )
}