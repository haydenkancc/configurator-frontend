import {CentralProcessorCoreFamilyParams} from '@/server/models/components';
import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';


export function MicroarchitectureComboBox({...props} : ComboBoxProps<CentralProcessorCoreFamilyParams["microarchitectures"][number]>) {
    return (
        <ComboBox label="Microarchitecture" grow isRequired {...props}>
            {microarchitecture => (
                <ComboBoxItem textValue={microarchitecture.name}>{microarchitecture.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}