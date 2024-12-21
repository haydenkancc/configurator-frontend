import { CentralProcessor } from '@/server/models/catalogue';
import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';

export function CentralProcessorSocketComboBox({...props } : ComboBoxProps<CentralProcessor.SocketDto>) {
    return (
        <ComboBox grow label="Socket" placeholder="Select a socket" isRequired {...props}>
            {socket => (
                <ComboBoxItem>{socket.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function CentralProcessorSeriesComboBox({...props } : ComboBoxProps<CentralProcessor.SeriesDto>) {
    return (
        <ComboBox grow label="Series" placeholder="Select a series" isRequired {...props}>
            {series => (
                <ComboBoxItem>{series.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function CentralProcessorCoreFamilyComboBox({...props } : ComboBoxProps<CentralProcessor.CoreFamilyDtoSimple>) {
    return (
        <ComboBox grow label="Core family" placeholder="Select a core family" isRequired {...props}>
            {coreFamily => (
                <ComboBoxItem>{coreFamily.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function CentralProcessorMicroarchitectureComboBox({...props} : ComboBoxProps<CentralProcessor.MicroarchitectureDto>) {
    return (
        <ComboBox label="Microarchitecture" placeholder="Select a microarchitecture" grow isRequired {...props}>
            {microarchitecture => (
                <ComboBoxItem textValue={microarchitecture.name}>{microarchitecture.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

export function CentralProcessorUnitComboBox({...props} : ComboBoxProps<CentralProcessor.UnitDtoSimple>) {
    return (
        <ComboBox placeholder="Select a processor" isRequired grow {...props}>
            {unit => <ComboBoxItem>{unit.name}</ComboBoxItem>}
        </ComboBox>
    )
}