import {Select, SelectItem, SelectProps} from '@/components/ui/select';
import {M2FormFactor, M2SlotParams} from '@/server/models/components';
import {ListData} from 'react-stately';
import {
    ListBuilder,
    ListBuilderAddButton,
    ListBuilderComboBox,
    ListBuilderComboBoxItem,
    ListBuilderList,
    ListBuilderListItem,
    ListBuilderRow,
    ListBuilderTrashButton
} from '@/components/ui/list-builder';
import React from 'react';

export function M2KeySelect({...props } : SelectProps<M2SlotParams["keys"][number]>) {
    return (
        <Select isRequired placeholder="Select a key" label="Keying" {...props}>
            {key => <SelectItem>{key.name}</SelectItem>}
        </Select>
    )
}

export function M2VersionSelect({...props } : SelectProps<M2SlotParams["versions"][number]>) {
    return (
        <Select isRequired placeholder="Select a version" label="PCIe version" {...props}>
            {version => <SelectItem>{version.name}</SelectItem>}
        </Select>
    )
}

export function M2LaneSizeSelect({...props } : SelectProps<M2SlotParams["laneSizes"][number]>) {
    return (
        <Select isRequired placeholder="Select a size" label="PCIe lane size" {...props}>
            {size => <SelectItem id={size.laneCount}>{`x${size.laneCount}`}</SelectItem>}
        </Select>
    )
}

export function M2FormFactorsListBuilder({ gridListItems, comboBoxItems } : { gridListItems: ListData<M2FormFactor>, comboBoxItems: ListData<M2FormFactor> }) {
    return (
        <ListBuilder gridListItems={gridListItems} comboBoxItems={comboBoxItems}>
            <ListBuilderList<M2FormFactor>>
                {item =><ListBuilderListItem>{item.name}<ListBuilderTrashButton /></ListBuilderListItem>}
            </ListBuilderList>
            <ListBuilderRow>
                <ListBuilderComboBox<M2FormFactor>>
                    {item =>
                        <ListBuilderComboBoxItem>
                            {item.name}
                        </ListBuilderComboBoxItem>
                    }
                </ListBuilderComboBox>
                <ListBuilderAddButton />
            </ListBuilderRow>
        </ListBuilder>
    )
}