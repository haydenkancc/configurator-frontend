'use client'
import s from './index.module.scss';
import {GridList, GridListItem, GridListItemProps, GridListProps} from 'react-aria-components';
import {ComboBox, ComboBoxItem} from '@/components/ui/combo-box';
import SelectItem from '@/components/ui/select-item';
import {Button} from '@/components/ui/button';
import {Plus} from '@phosphor-icons/react/dist/ssr';
import {useListData} from 'react-stately';


let keys = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 3, name: 'C' },
        { id: 4, name: 'D' },
        { id: 5, name: 'E' },
        { id: 6, name: 'A+E' },
        { id: 7, name: 'F' },
        { id: 8, name: 'G' },
        { id: 9, name: 'H' },
        { id: 10, name: 'J' },
        { id: 11, name: 'K' },
        { id: 12, name: 'L' },
        { id: 13, name: 'M' },
        { id: 14, name: 'B+M' }
    ]


export function ListBuilder({children, className, items, ...props} : GridListProps<object>) {

    let list = useListData({
        initialItems: keys,
        getKey: item => item.id
    });


    return (
        <div className={s.listBuilder}>
            <GridList className={`${s.gridList} ${className}`} {...props}>
                {children}
            </GridList>
            <div className={s.row}>
                <ComboBox grow defaultItems={list.items}>
                    {item => (
                        <ComboBoxItem>
                            {item.name}
                        </ComboBoxItem>
                    )}
                </ComboBox>
                <Button variant="primary"><Plus weight="bold"></Plus></Button>
            </div>
        </div>
    )
}

export function ListBuilderItem({children, className, ...props} : GridListItemProps) {
    return (
        <GridListItem className={`${s.gridListItem} ${className}`} {...props}>
            {children}
        </GridListItem>
    )
}