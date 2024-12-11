import { ComboBox } from '../combo-box';
import s from './index.module.scss';
import {
    Button, ButtonProps,
    Cell, CellProps,
    Collection,
    Column, ColumnProps, Key,
    Row, RowProps,
    Table,
    TableBody,
    TableBodyProps,
    TableHeader, TableHeaderProps
} from 'react-aria-components';
import {Plus, TrashSimple} from '@phosphor-icons/react/dist/ssr';
import {NumberField} from '@/components/ui/number-field';
import {useListData} from 'react-stately';
import {CollectionProps} from '@react-aria/collections';

interface TableBuilderProps {
    children: React.ReactNode | React.ReactNode[]
}

// export function TableBuilder({children, ...props} : TableBuilderProps) {
//     return (
//         <div>
//         <Table aria-label="Files" className={s.table}>
//             {children}
//         </Table>
//         </div>
//     );
// }

export function TableBuilderColumns<T extends object>({ ...props } : TableHeaderProps<T>) {
    return (
        <TableHeader className={s.header} {...props}>
        </TableHeader>
    )
}

export function TableBuilderColumn({ ...props } : ColumnProps) {
    return (
        <Column className={s.column} {...props} />
    )
}

interface MyTableBuilderProps<T extends object> extends CollectionProps<T> {
    emptyState?: React.ReactNode;
}

export function TableBuilder<T extends object>({children, items, emptyState, ...props} : MyTableBuilderProps<T>) {

    return (
        <div className={s.collection}>
            <Collection items={items} {...props}>
                {children}
            </Collection>
            {items?.[Symbol.iterator]().next().done && <div className={s.empty}>{emptyState}</div>}
        </div>
    )
}

interface TableBuilderRowProps {
    children?: React.ReactNode;
    id: Key;
}
export function TableBuilderRow({children} : TableBuilderRowProps) {
    return (
        <div className={s.row}>
            {children}
        </div>
    )
}

export function TableBuilderDeleteButton({ children, ...props } : ButtonProps ) {
    return (
        <Button className={s.trashButton} {...props}>
            <TrashSimple weight="fill" className={s.trashButtonIcon} />
        </Button>
    )
}