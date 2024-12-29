import s from './index.module.scss';
import {
    Button,
    ButtonContext, ButtonProps,
    ComboBoxContext,
    GridListItemProps,
    GridListProps, Input,
    Key, ListBoxItemProps,
    Provider, ToggleButton, ToggleButtonContext, ToggleButtonProps, useContextProps, useSlottedContext
} from 'react-aria-components';
import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import {Plus, TrashSimple} from '@phosphor-icons/react/dist/ssr';
import {ListData, useListData} from 'react-stately';
import React, {createContext, ReactNode, useCallback, useContext, useState} from 'react';
import {useFilter} from '@react-aria/i18n';
import {GridListContext, ListBoxContext, DEFAULT_SLOT} from 'react-aria-components';
import {RecursiveMap} from '@/server/models';
import {GridList, GridListItem} from '@/components/ui/grid-list';

const RemoveFromListContext = createContext((key: number) => {});

export interface ListBuilderProps<T> {
    comboBoxItems: RecursiveMap<T>;
    gridListItems: RecursiveMap<T>;
    handleAdd: (key: number | null) => void;
    handleRemove: (key: number) => void;
    children?: React.ReactNode | React.ReactNode[];
}

export function ListBuilder<T extends { id: number; }>({ comboBoxItems, gridListItems, handleAdd, handleRemove, children } : ListBuilderProps<T>) {

    const [ selectedKey, setSelectedKey ] = useState<number | null>(null)

    const onSelectionChange = (id: number | null) => {
        setSelectedKey(id);
    };

    return (
        <Provider values={[
            [GridListContext, {
                slots: {
                    [DEFAULT_SLOT]: {
                        items: gridListItems,
                    }
                }
            }],
            [ComboBoxContext, {
                slots: {
                    [DEFAULT_SLOT]: {
                        items: comboBoxItems,
                        onSelectionChange: (key) => onSelectionChange(key as number | null),
                        selectedKey: selectedKey,
                    }
                }
            }],
            [ButtonContext, {
                slots: {
                    submit: {
                        onPress: (e) => handleAdd(selectedKey)
                    }
                }
            }]
        ]}>
            <RemoveFromListContext.Provider value={handleRemove}>
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
        <GridList className={s.gridList} {...props} renderEmptyState={() => <div className={s.gridListEmpty}>List is empty.</div>}>
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
                            onPress: () => removeFromList(props.id as number ?? null)
                        }
                    }
                }}>
                    {children as ReactNode}
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