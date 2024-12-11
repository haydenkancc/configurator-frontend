import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import {
    CentralProcessorChannel,
    CentralProcessorCoreFamily, CentralProcessorCoreFamilyParams,
    CentralProcessorSeries,
    CentralProcessorSocket, CentralProcessorUnitSimple
} from '@/server/models/components';

export function CentralProcessorSocketComboBox({...props } : ComboBoxProps<CentralProcessorSocket>) {
    return (
        <ComboBox grow label="Socket" isRequired {...props}>
            {socket => (
                <ComboBoxItem>{socket.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function CentralProcessorSeriesComboBox({...props } : ComboBoxProps<CentralProcessorSeries>) {
    return (
        <ComboBox grow label="Series" isRequired {...props}>
            {series => (
                <ComboBoxItem>{series.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function CentralProcessorChannelComboBox({...props } : ComboBoxProps<CentralProcessorChannel>) {
    return (
        <ComboBox placeholder="Select the number of chanels" grow label="Multi-channel capability" isRequired {...props}>
            {channel => (
                <ComboBoxItem>{channel.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function CentralProcessorCoreFamilyComboBox({...props } : ComboBoxProps<CentralProcessorCoreFamily>) {
    return (
        <ComboBox grow label="Core family" isRequired {...props}>
            {coreFamily => (
                <ComboBoxItem>{coreFamily.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function CentralProcessorMicroarchitectureComboBox({...props} : ComboBoxProps<CentralProcessorCoreFamilyParams["microarchitectures"][number]>) {
    return (
        <ComboBox label="Microarchitecture" grow isRequired {...props}>
            {microarchitecture => (
                <ComboBoxItem textValue={microarchitecture.name}>{microarchitecture.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function CentralProcessorUnitComboBox({...props} : ComboBoxProps<CentralProcessorUnitSimple>) {
    return (
        <ComboBox {...props}>
            {unit => <ComboBoxItem>{unit.name}</ComboBoxItem>}
        </ComboBox>
    )
}