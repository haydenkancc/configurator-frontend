import s from './index.module.scss';
import {Content, Grid, Module} from '@/components/catalogue/views/item-view';
import {CaretDown, Plus, TrashSimple} from '@phosphor-icons/react/dist/ssr';
import {
    Button,
    ButtonContext,
    Collection,
    GridList,
    GridListItem,
    GridListItemProps,
    GridListProps, Provider
} from 'react-aria-components';
import {Key, ListData, TreeData, TreeOptions, useListData, useTreeData} from 'react-stately';
import {ComboBox} from '../combo-box';
import {NumberField} from '@/components/ui/number-field';
import {CSSProperties} from 'react';
import {TreeNode} from '@react-stately/data';
import {CaretRight} from '@phosphor-icons/react';
import { TextField } from '../text-field';

interface ItemValue {
    id: number;
    name: string;
    open?: boolean;
    items?: Array<Omit<ItemValue, 'open'>>;
}

interface TreeBuilderProps<T extends object> extends Omit<GridListProps<T>, 'items'> {
    list: Iterable<T>
}

export function TreeBuilder<T extends object>({children, list, ...props} : TreeBuilderProps<T>) {

    return (
        <>
            <div className={s.tree}>
                <Collection items={list} dependencies={[children]}>
                    {children}
                </Collection>
            </div>
        </>
    )
}

interface TreeBuilderDropdownProps<T extends object> extends GridListItemProps {
    branches?: T[];
    branch?: (item: T) => React.ReactNode;
    indent?: number;
    dropdowns?: React.ReactNode;
    openAction: (open: boolean) => void;
    addAction?: () => void;
    removeAction?: () => void;
    open: boolean;
    isRoot?: boolean;
    noTrash?: boolean;
    noNew?: boolean;
    hasDropdownChildren?: boolean
    newMessage?: string;
}

export function TreeBuilderDropdown<T extends object>({newMessage, noNew = false, dropdowns, children, branches, isRoot = false, noTrash=false, hasDropdownChildren = false, indent = 0, branch, open, openAction, addAction, removeAction, ...props} : TreeBuilderDropdownProps<T>) {

    return (
        <div className={s.dropdownWrapper}>
            <div
                style={{"--tree-builder-indent": indent} as CSSProperties}
                className={`${s.dropdown} ${isRoot ? s.dropdownRoot : s.dropdownChild} ${open ? s.dropdownOpen : s.dropdownClosed} ${noNew ? s.dropdownNoNew : ''}`}

            >
                <Button className={s.dropdownCaret} onPress={() => openAction(!open)}>
                    {open ? <CaretDown weight="bold" /> : <CaretRight weight="bold" />}
                </Button>
                <TreeBuilderDropdownContent>
                    <>
                        {children}
                    </>
                </TreeBuilderDropdownContent>
                <Button className={s.trash} onPress={removeAction} isDisabled={noTrash}>
                    <TrashSimple weight="fill" />
                </Button>
            </div>
            {open &&
                <div className={s.dropdownChildren}>
                    {dropdowns}
                    <Collection items={branches} dependencies={[]}>{item => branch && branch(item)}</Collection>
                    {!noNew &&
                        <div
                            style={{"--tree-builder-indent": indent + 1} as CSSProperties}
                            className={`${s.new} ${isRoot ? s.newRoot : ''}`}
                        >
                        <Button className={s.buttonNew} onPress={addAction}>
                            <Plus weight="bold" />{newMessage}
                         </Button>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export function TreeBuilderDropdownContent({children} : Readonly<{children: React.ReactNode}>) {
    return (
        <div className={s.dropdownContent}>
            {children}
        </div>
    )
}

interface TreeBuilderBranchProps extends GridListItemProps {
    indent?: number;
    removeAction: () => void;
}
export function TreeBuilderBranch({children, indent = 0, removeAction, ...props} : TreeBuilderBranchProps) {
    return (
        <div className={s.branch} style={{"--tree-builder-indent": indent} as CSSProperties}>
            <>
                <div className={s.branchContent}>
                    <>
                        {children}
                    </>
                </div>
                <Button className={s.trash} onPress={removeAction}>
                    <TrashSimple weight="fill" />
                </Button>
            </>
        </div>
    )
}

interface TreeBuilderDropdownCaretProps {
    open?: boolean;
}

export function TreeBuilderDropdownCaret({open, ...props} : TreeBuilderDropdownCaretProps) {
    return (
        <Button className={s.dropdownCaret} slot='caret'>
            {open ? <CaretDown weight="bold" /> : <CaretRight weight="bold" />}
        </Button>
    )
}

interface TreeBuilderTrashProps {
    action: () => void;
}

export function TreeBuilderTrash({action, ...props} : TreeBuilderTrashProps) {
    return (
        <Button className={s.trash} onPress={action} {...props}>
            <TrashSimple weight="fill" />
        </Button>
    )
}