import {Select, SelectProps} from '@/components/ui/select/select';
import {M2SlotParams} from '@/server/models';
import SelectItem from '@/components/ui/select-item';

export function M2KeySelect({...props } : SelectProps<M2SlotParams["keys"][number]>) {
    return (
        <Select label="Keying" {...props}>
            {key => <SelectItem>{key.name}</SelectItem>}
        </Select>
    )
}

export function M2VersionSelect({...props } : SelectProps<M2SlotParams["versions"][number]>) {
    return (
        <Select label="PCIe version" {...props}>
            {version => <SelectItem>{version.name}</SelectItem>}
        </Select>
    )
}

export function M2LaneSizeSelect({...props } : SelectProps<M2SlotParams["laneSizes"][number]>) {
    return (
        <Select label="PCIe lane size" {...props}>
            {size => <SelectItem id={size.laneCount}>{`x${size.laneCount}`}</SelectItem>}
        </Select>
    )
}