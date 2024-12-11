'use client';
import {
    Cell as AriaCell,
    CellProps,
    Checkbox as AriaCheckbox,
    CheckboxProps,
    Column as AriaColumn,
    ColumnProps,
    Row as AriaRow,
    RowProps,
    Table as AriaTable,
    TableBody as AriaTableBody,
    TableBodyProps,
    TableHeader as AriaTableHeader,
    TableHeaderProps,
    TableProps,
    useTableOptions,
} from 'react-aria-components';
import s from './index.module.scss';
import {Check} from '@phosphor-icons/react';

export interface MyTableProps extends TableProps {
    columns: {name: string, id: string, isRowHeader?: boolean}[];
    rows?: Record<string, any>[]
}

export interface MyColumnProps extends ColumnProps {
    size?: 'small' | 'medium' | 'large' | 'max';
}

export function Table({ children, ...props } : MyTableProps) {

    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <AriaTable className={s.table} selectionMode="single" aria-label="table" {...props}>
                    {children}
                </AriaTable>
            </div>
        </div>
    )
}

export function TableHeader<T extends object>({ columns, children, className, ...props }: TableHeaderProps<T>) {
    let { selectionBehavior, selectionMode, allowsDragging } = useTableOptions();

    return (
        <AriaTableHeader className={`${s.tableHeader} ${className}`} {...props}>
            {children}
        </AriaTableHeader>
    );
}

export function TableBody({children, items, ...props} : TableBodyProps<any>) {
    return (
        <AriaTableBody className={s.tableBody} items={items} {...props}>
            {children}
        </AriaTableBody>
    )
}

export function Row<T extends object>({ id, columns, children, className, ...props }: RowProps<T>) {
    return (
        <AriaRow id={id} className={`${s.row} ${className}`} {...props}>
            {children}
        </AriaRow>
    );
}

export function Column({children, className, size, ...props} : MyColumnProps) {
    return(
        <AriaColumn className={`${s.column}
        ${size === 'small' ? s.smallColumn : ''} 
        ${size === 'medium' ? s.mediumColumn : ''} 
        ${size === 'large' ? s.largeColumn : ''} 
        ${size === 'max' ? s.maxColumn : ''}
        ${className}`} {...props}>
            {children}
        </AriaColumn>
    )
}

export function Checkbox({children, ...props} : CheckboxProps) {
    return (
        <AriaCheckbox className={s.checkbox} {...props}>
            {({isSelected}) => <>
                <div className={s.checkboxBox}>
                    {isSelected && <Check weight="bold" className={s.checkboxIcon}/>}
                </div>
                {children}
            </>}
        </AriaCheckbox>
    )
}

interface MyCellProps extends CellProps {
    checkbox?: boolean;
}
export function Cell({children, className, checkbox = false, ...props} : MyCellProps) {
    return (
        <AriaCell className={`${s.cell} ${className} ${checkbox ? s.checkboxCell : ""}`} {...props}>
            {children}
        </AriaCell>
    )
}




