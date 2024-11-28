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
import {M2KeyBase} from '@/server/models/components';
import React from 'react';
import {ListData} from 'react-stately';


export function M2KeysListBuilder({ gridListItems, comboBoxItems } : { gridListItems: ListData<M2KeyBase>, comboBoxItems: ListData<M2KeyBase>}) {
    return (
        <ListBuilder gridListItems={gridListItems} comboBoxItems={comboBoxItems}>
            <ListBuilderList<M2KeyBase> aria-label="selected keys">
                {item =><ListBuilderListItem textValue={item.name}>{item.name}<ListBuilderTrashButton /></ListBuilderListItem>}
            </ListBuilderList>
            <ListBuilderRow>
                <ListBuilderComboBox<M2KeyBase> aria-label="key selector">
                    {item =>
                        <ListBuilderComboBoxItem textValue={item.name}>
                            {item.name}
                        </ListBuilderComboBoxItem>
                    }
                </ListBuilderComboBox>
                <ListBuilderAddButton />
            </ListBuilderRow>
        </ListBuilder>
    )
}