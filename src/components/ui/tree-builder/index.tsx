'use client'
import s from './index.module.scss';
import {
    UNSTABLE_Tree as Tree,
    UNSTABLE_TreeItem as TreeItem,
    UNSTABLE_TreeItemContent as TreeItemContent,
    Button,
    Collection,
    ListBox,
    Section,
    Header,
    ListBoxItem,
    GridList,
    GridListItem,
    Selection,
    GridListItemProps,
    GridListContext, useContextProps
} from 'react-aria-components';
import {forwardRef, ReactNode, useState} from 'react';
import {Checkbox} from '@/components/ui/table';
import {useTreeData} from 'react-stately';
import {CaretDown} from '@phosphor-icons/react/dist/ssr';
import {CaretRight} from '@phosphor-icons/react';
import {ComboBox} from '@/components/ui/combo-box';
import SelectItem from '@/components/ui/select-item';

interface ItemValue {
    id: number;
    title: string;
    children?: Array<ItemValue>;

}

export function TreeBuilder() {
    let tree = useTreeData<ItemValue>({
        initialItems: [
            {id: 1, title: 'Documents', children: [
                    {id: 2, title: 'Project', children: [
                            {id: 3, title: 'Weekly Report',}
                        ]}
                ]},
            {id: 4, title: 'Photos', children: [
                    {id: 5, title: 'Image 1',},
                    {id: 6, title: 'Image 2',}
                ]}
        ],
        getKey: (item) => item.id,
        getChildren: (item) => item.children || [],
    });

    let [selected, setSelected] = useState<Selection>(new Set([2]));

    return (
        <>
            <ComboBox>
                <SelectItem>
                    hello
                </SelectItem>
            </ComboBox>
            <GridList
                className={s.gridList}
                aria-label="Pick an animal"
                items={tree.items}
                selectedKeys={selected}
                selectionMode="single"
                selectionBehavior="replace"
                onSelectionChange={(key) => {setSelected(key); console.log(key)}}
            >
                {(_item) => {
                    function renderItem(item: typeof _item, level: number = 0) {
                        return (
                            <div>
                                <ListItem style={{'--level': level} as React.CSSProperties} id={item.value.id}>
                                    <CaretDown />{item.value.title}
                                </ListItem>
                                <Collection items={item.children}>
                                    {(item) => renderItem(item, level + 1)}
                                </Collection>
                            </div>

                        )
                    }
                    return renderItem(_item);
                }}
            </GridList>
            <Button>Add new item</Button>
        </>
    )

}

interface ItemProps extends GridListItemProps {
    level?: number;
}

function ListItem({children, level, id, ...props} : ItemProps) {
    return (
        <GridListItem id={id} className={s.gridListItem} {...props}>
            {children}
        </GridListItem>
    )
}