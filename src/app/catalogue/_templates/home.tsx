'use client';
import s from './home.module.scss';
import {
    Cell,
    Checkbox,
    Column,
    MyTableProps,
    Row,
    Table as MyTable,
    TableBody,
    TableHeader
} from '@/components/ui/table'
import { LineVertical, CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';
import {
    Button as AriaButton,
    Collection,
    DialogTrigger,
    Input,
    Link as AriaLink,
    TextField,
    Form,
    ButtonProps, LinkProps
} from 'react-aria-components';
import AlertDialog from '@/components/ui/dialog/alert-dialog';
import { Link } from '@/components/ui/button';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useCallback} from 'react';

export function Body({ children } : Readonly<{ children: React.ReactNode}>) {
    return (
        <div className={s.body}>
            { children }
        </div>
    )
}

export function Controls({ children } : Readonly<{ children: React.ReactNode}>) {
    return (
        <div className={s.controls}>
            { children }
        </div>
    )
}

export function CreateButton({ children, ...props} : LinkProps) {
    const pathname = usePathname();
    return (
        <Link variant="primary" href={`${pathname}/create`} {...props}>
            {children}
        </Link>
    )
}

interface HomeTableProps extends MyTableProps {
    deleteAction: (id: number) => Promise<void>
}

export function Table({ columns, rows, deleteAction } : HomeTableProps) {
    const pathName = usePathname();
    return (
        <MyTable columns={columns} rows={rows}>
            <TableHeader columns={columns}>
                <Column className={s.checkboxColumn} />
                <Collection items={columns} aria-label="columns">
                    {column => (
                        <Column isRowHeader={column.isRowHeader}>
                            {column.name}
                        </Column>
                    )}
                </Collection>
                <Column spacer />
                <Column className={s.operationsColumn} />
            </TableHeader>
            <TableBody items={rows}>
                {item => (
                    <Row>
                        <Cell>
                            <Checkbox slot="selection"/>
                        </Cell>
                        <Collection items={columns} aria-label="row cells">
                            {column => (
                                <Cell className={s.cell}>
                                    {item[column.id]}
                                </Cell>
                            )}
                        </Collection>
                        <Cell />
                        <Cell>
                            <div className={s.operationsCell}>
                                <AriaLink className={s.operationsCell__link} href={`${pathName}/${item.id}`}>Details</AriaLink>
                                <LineVertical />
                                <DialogTrigger>
                                    <AriaButton className={s.operationsCell__link}>Delete</AriaButton>
                                    <AlertDialog title="Confirmation" action={() => deleteAction(item.id)} confirmLabel="Delete">
                                        Are you sure you want to delete this item? All contents and related items will be permanently destroyed.
                                    </AlertDialog>
                                </DialogTrigger>
                            </div>
                        </Cell>
                    </Row>
                )}
            </TableBody>
        </MyTable>
    )
}

interface PaginationProps {
    pageCount: number;
}

export function Pagination({ pageCount } : PaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    return (
        <div className={s.pagination}>
            <Link variant="neutral"
                  href={pathname + '?' + createQueryString('page', `${searchParams.get('page') ? parseInt(searchParams.get('page')!) - 1 : ''}`)}
            >
                <CaretLeft className={s.paginationButton__icon} />Previous
            </Link>
            <div className={s.paginationPages}>
                {pageCount <= 6 ?
                    <>
                        {[...Array(pageCount).keys()].map((number) => (
                            <AriaLink key={number} className={s.paginationPage} href={pathname + '?' + createQueryString('page', `${number + 1}`)}>
                                {number + 1}
                            </AriaLink>
                        ))}
                    </>
                    :
                    <>
                        {[...Array(3).keys()].map((number) => (
                            <AriaLink key={number} className={s.paginationPage} href={pathname + '?' + createQueryString('page', `${number + 1}`)}>
                                {number + 1}
                            </AriaLink>
                        ))}
                        <Form
                            onSubmit={(e) => {
                                router.push(pathname + '?' + createQueryString('page', (e.currentTarget.elements[0] as HTMLInputElement).value))
                            }}
                            aria-label="page select"
                        >
                            <TextField aria-label="page number" className={s.paginationTextField}>
                                <Input name="pageNumber" type="tel" className={s.paginationInput} placeholder="..." size={0} />
                            </TextField>
                        </Form>
                        {[...Array(3).keys()].map((number) => (
                            <AriaLink key={number} className={s.paginationPage} href={pathname + '?' + createQueryString('page', `${number + pageCount - 2}`)}>
                                {number + pageCount - 2}
                            </AriaLink>
                        ))}
                    </>
                }
            </div>
            <Link variant="neutral"
                  href={pathname + '?' + createQueryString('page', `${searchParams.get('page') ? parseInt(searchParams.get('page')!) + 1 : ''}`)}
            >
                Next<CaretRight className={s.paginationButtonIcon} />
            </Link>
        </div>
    )
}