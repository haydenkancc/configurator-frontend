import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import {CentralProcessorUnitParams, MemoryKitParams} from '@/server/models/components';

export function ManufacturerComboBox({...props } : ComboBoxProps<CentralProcessorUnitParams["manufacturers"][number]>) {
    return (
        <ComboBox label="Manufacturer" isRequired {...props}>
            {manufacturer => (
                <ComboBoxItem>{manufacturer.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function SocketComboBox({...props } : ComboBoxProps<CentralProcessorUnitParams["sockets"][number]>) {
    return (
        <ComboBox grow label="Socket" isRequired {...props}>
            {socket => (
                <ComboBoxItem>{socket.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function SeriesComboBox({...props } : ComboBoxProps<CentralProcessorUnitParams["series"][number]>) {
    return (
        <ComboBox grow label="Series" isRequired {...props}>
            {series => (
                <ComboBoxItem>{series.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function ChannelComboBox({...props } : ComboBoxProps<CentralProcessorUnitParams["channels"][number]>) {
    return (
        <ComboBox grow label="Multi-channel capability" isRequired {...props}>
            {channel => (
                <ComboBoxItem>{channel.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function CoreFamilyComboBox({...props } : ComboBoxProps<CentralProcessorUnitParams["coreFamilies"][number]>) {
    return (
        <ComboBox grow label="Core family" isRequired {...props}>
            {coreFamily => (
                <ComboBoxItem>{coreFamily.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function MemoryCapacityComboBox({...props } : ComboBoxProps<CentralProcessorUnitParams["memoryCapacities"][number]>) {
    return (
        <ComboBox grow label="Maximum memory capacity (GB)" isRequired {...props}>
            {capacity => (
                <ComboBoxItem id={capacity.size} textValue={`${capacity.size}`}>{capacity.size}</ComboBoxItem>
            )}
        </ComboBox>
    )
}