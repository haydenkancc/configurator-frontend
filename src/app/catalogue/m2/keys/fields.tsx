import {
    ListBuilder,
    ListBuilderAddButton,
    ListBuilderComboBox, ListBuilderComboBoxItem,
    ListBuilderList,
    ListBuilderListItem,
    ListBuilderRow,
    ListBuilderTrashButton
} from '@/components/ui/list-builder';
import {M2KeyBase} from '@/server/models';
import React from 'react';
import {ListData} from 'react-stately';


export function M2KeysListBuilder({ initialItems, items } : { initialItems: ListData<M2KeyBase>, items: ListData<M2KeyBase>}) {
    return (
        <ListBuilder initialItems={initialItems} items={items}>
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