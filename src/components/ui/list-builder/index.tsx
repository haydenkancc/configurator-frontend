'use client'
import s from './index.module.scss';
import {
    Button,
    ButtonContext, ButtonProps,
    ComboBoxContext,
    GridList,
    GridListItem,
    GridListItemProps,
    GridListProps, Input,
    Key, ListBoxItemProps,
    Provider, ToggleButton, ToggleButtonContext, ToggleButtonProps, useContextProps, useSlottedContext
} from 'react-aria-components';
import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import SelectItem from '@/components/ui/select-item';
import {Plus, TrashSimple} from '@phosphor-icons/react/dist/ssr';
import {ListData, useListData} from 'react-stately';
import React, {createContext, ReactNode, useContext, useState} from 'react';
import {useFilter} from '@react-aria/i18n';
import {GridListContext, ListBoxContext, DEFAULT_SLOT} from 'react-aria-components';

const RemoveFromListContext = createContext((key: Key | null) => {});
const DeleteItemContext = createContext(() => {});

let keys = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 3, name: 'C' },
        { id: 4, name: 'D' },
        { id: 5, name: 'E' },
        { id: 6, name: 'A+E'},
        { id: 7, name: 'F' },
        { id: 8, name: 'G' },
        { id: 9, name: 'H' },
        { id: 10, name: 'J' },
        { id: 11, name: 'K' },
        { id: 12, name: 'L' },
        { id: 13, name: 'M' },
        { id: 14, name: 'B+M' }
]

let key = {
    id: 6, name: 'A+E'
}

let compatibleKeys = [
    { id: 1, name: 'A' },
    { id: 5, name: 'E' },
]

export interface ListBuilderProps<T extends { id: number }> {
    items: ListData<T>;
    initialItems: ListData<T>;
    children?: React.ReactNode | React.ReactNode[];
}

export function ListBuilder<T extends { id: number; }>({ items, initialItems, children } : ListBuilderProps<T>) {

    const gridListItems = initialItems;
    const comboBoxItems = items;

    const [ selectedKey, setSelectedKey ] = useState<Key | null>(null)

    const onSelectionChange = (id: Key | null) => {
        setSelectedKey(id);
    };

    const addToList = (key: Key | null) => {
        if (key) {
            gridListItems.append(comboBoxItems.getItem(key));
            setSelectedKey(null);
            comboBoxItems.remove(key);
        }
    }

    const removeFromList = (key: Key | undefined | null) => {
        if (key) {

            comboBoxItems.append(gridListItems.getItem(key));
            gridListItems.remove(key);
        }
    }

    return (
        <Provider values={[
            [GridListContext, {
                slots: {
                    [DEFAULT_SLOT]: {
                        items: gridListItems.items,
                    }
                }
            }],
            [ComboBoxContext, {
                slots: {
                    [DEFAULT_SLOT]: {
                        items: comboBoxItems.items,
                        onInputChange: comboBoxItems.setFilterText,
                        onSelectionChange: onSelectionChange,
                        selectedKey: selectedKey,
                    }
                }
            }],
            [ButtonContext, {
                slots: {
                    submit: {
                        onPress: (e) => addToList(selectedKey)
                    }
                }
            }]
        ]}>
            <RemoveFromListContext.Provider value={removeFromList}>
                <div className={s.listBuilder}>
                    {children}
                </div>
            </RemoveFromListContext.Provider>
        </Provider>
    )
}

interface ListBuilderListProps<T extends object> extends Omit<GridListProps<T>, 'items'> {
    children?: ReactNode | ((item: T) => ReactNode);
}

export function ListBuilderList<T extends object>({ children, ...props}: ListBuilderListProps<T>) {

    return (
        <GridList className={s.gridList} {...props} renderEmptyState={() => <div className={s.gridListEmpty}>No items selected.</div>}>
            {children}
        </GridList>
    )
}

export function ListBuilderRow({children} : Readonly<{children: React.ReactNode}>) {
    return <div className={s.row}>{children}</div>
}

export function ListBuilderListItem({children, className, ...props} : GridListItemProps) {
    const removeFromList = useContext(RemoveFromListContext)
    return (

            <GridListItem className={`${s.gridListItem} ${className}`} {...props}>
                <ButtonContext.Provider value={{
                    slots: {
                        remove: {
                            onPress: () => removeFromList(props.id ?? null)
                        }
                    }
                }}>
                    <>
                        {children}
                    </>
                </ButtonContext.Provider>
            </GridListItem>

    )
}


export function ListBuilderTrashButton({ children, id, className, ...props} : ButtonProps) {

    return (
        <Button className={s.trashButton} slot='remove' {...props}>
            <TrashSimple weight="fill" className={s.trashButtonIcon} />
        </Button>
    )
}

export function ListBuilderAddButton({ children, className, ...props} : ButtonProps) {

    return (
        <Button className={s.addButton} slot='submit' {...props}>
            <Plus weight="bold" />
        </Button>
    )
}

export function ListBuilderComboBox<T extends object>({ children, ...props}: Omit<ComboBoxProps<T>, 'items' | 'defaultItems'>) {
    return (
        <ComboBox grow {...props}>
            {children}
        </ComboBox>
    )
}

export function ListBuilderComboBoxItem({ children, ...props} : ListBoxItemProps) {
    return (
        <ComboBoxItem {...props}>
            {children}
        </ComboBoxItem>
    )
}