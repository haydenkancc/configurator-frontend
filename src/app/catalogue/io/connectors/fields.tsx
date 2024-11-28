import {IOConnectorBase} from '@/server/models/components';
import {ListData} from 'react-stately';
import {
    ListBuilder,
    ListBuilderAddButton,
    ListBuilderComboBox, ListBuilderComboBoxItem,
    ListBuilderList,
    ListBuilderListItem,
    ListBuilderRow,
    ListBuilderTrashButton
} from '@/components/ui/list-builder';
import React from 'react';


export function IOConnectorsListBuilder({ gridListItems, comboBoxItems } : { gridListItems : ListData<IOConnectorBase>, comboBoxItems : ListData<IOConnectorBase> }) {
    return (
        <ListBuilder gridListItems={gridListItems} comboBoxItems={comboBoxItems}>
            <ListBuilderList<IOConnectorBase>>
                {item =><ListBuilderListItem>{item.name}<ListBuilderTrashButton /></ListBuilderListItem>}
            </ListBuilderList>
            <ListBuilderRow>
                <ListBuilderComboBox<IOConnectorBase>>
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