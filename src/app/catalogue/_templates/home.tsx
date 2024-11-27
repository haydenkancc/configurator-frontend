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
import {CaretLeft, CaretRight, LineVertical} from '@phosphor-icons/react/dist/ssr';
import {
    Button,
    Collection,
    DialogTrigger,
    Form,
    Input,
    Link as AriaLink,
    LinkProps,
    Tab,
    TabList,
    Tabs,
    TextField
} from 'react-aria-components';
import {AlertDialog} from '@/components/ui/dialog/alert-dialog';
import {Link} from '@/components/ui/button';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useCallback, useContext} from 'react';
import {ToastQueueContext, ToastProvider} from '@/app/providers';

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
    deleteAction: (id: number) => Promise<boolean>
    columns: {
        name: string;
        id: string;
        isRowHeader?: boolean | undefined;
        size?: 'small' | 'medium' | 'large' | 'unset';
    }[]
}

export function Table({ columns, rows, deleteAction } : HomeTableProps) {
    const pathName = usePathname();
    const toastQueue = useContext(ToastQueueContext);
    return (
        <MyTable columns={columns} rows={rows}>
            <TableHeader columns={columns}>
                <Column className={s.checkboxColumn} />
                <Collection items={columns} aria-label="columns">
                    {column => (
                        <Column isRowHeader={column.isRowHeader} size={column.size}>
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
                                    <Button className={s.operationsCell__link}>Delete</Button>
                                    <AlertDialog title="Confirmation" action={async () => {
                                        const ok = await deleteAction(item.id)
                                        if (ok) {
                                            toastQueue.add({ title: `Item successfully deleted.`, color: 'primary'}, { timeout: 3000 })
                                        } else {
                                            toastQueue.add({ title: `Failed to delete item, please try again later.`, color: 'warning'}, { timeout: 3000 })
                                        }
                                    }} confirmLabel="Delete">
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
    pageCount?: number;
    pageIndex?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
}

interface PaginationPageProps {
    pageCount: number;
    pageIndex: number;
}

export function Pagination({ pageCount = 1, pageIndex = 1, hasPreviousPage = false, hasNextPage = false} : PaginationProps) {
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

    let pageNumberParam = searchParams.get('page')
    let pageNumber: number
    if (pageNumberParam && parseInt(pageNumberParam)) {
        pageNumber = parseInt(pageNumberParam)
    } else {
        pageNumber = 1
    }

    return (
        <div className={s.pagination}>
            <Link variant="neutral" isDisabled={!hasPreviousPage}
                  href={pathname + '?' + createQueryString('page', `${pageNumber - 1}`)}
            >
                <CaretLeft weight="bold" />Previous
            </Link>
            <div className={s.paginationPages}>
                <PaginationPages pageCount={pageCount} pageIndex={pageIndex} />
            </div>
            <Link variant="neutral" isDisabled={!hasNextPage}
                  href={pathname + '?' + createQueryString('page', `${pageNumber + 1}`)}
            >
                Next<CaretRight weight="bold" />
            </Link>
        </div>
    )
}

function PaginationPages({ pageCount, pageIndex } : PaginationPageProps) {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    if (pageCount <= 6) {
        return (
            <Tabs selectedKey={pageIndex} orientation="horizontal">
                <TabList className={s.paginationPages} items={Array.from(Array(pageCount)).map((e, i) => ({ id: ++i }))}>
                    {item => (
                        <Tab className={s.paginationPage} href={pathname + '?' + createQueryString('page', `${item.id}`)}>
                            {item.id}
                        </Tab>
                    )}
                </TabList>
            </Tabs>
        )
    }
    else
    {
        if (pageIndex <= 3 || pageCount - pageIndex < 3) {
            return (
                <>
                    <Tabs selectedKey={pageIndex} orientation="horizontal">
                        <TabList className={s.paginationPages} items={Array.from(Array(3)).map((e, i) => ({ id: ++i }))}>
                            {item => (
                                <Tab className={s.paginationPage} href={pathname + '?' + createQueryString('page', `${item.id}`)}>
                                    {item.id}
                                </Tab>
                            )}
                        </TabList>
                    </Tabs>
                    <Form
                        onSubmit={(e) => {
                            router.push(pathname + '?' + createQueryString('page', (e.currentTarget.elements[0] as HTMLInputElement).value))
                        }}
                        aria-label="page select"
                    >
                        <TextField aria-label="page number" className={s.paginationTextField}>
                            <Input name="pageNumber" type="tel" pattern="\d*" className={s.paginationInput} placeholder="..." size={0} />
                        </TextField>
                    </Form>
                    <Tabs selectedKey={pageIndex} orientation="horizontal">
                        <TabList className={s.paginationPages} items={Array.from(Array(3)).map((e, i) => ({ id: i + pageCount - 2 }))}>
                            {item => (
                                <Tab className={s.paginationPage} href={pathname + '?' + createQueryString('page', `${item.id}`)}>
                                    {item.id}
                                </Tab>
                            )}
                        </TabList>
                    </Tabs>
                </>

            )
        } else {
            return (
                <>
                    <AriaLink className={s.paginationPage} href={pathname + '?' + createQueryString('page', '1')}>
                        1
                    </AriaLink>
                    <Form
                        onSubmit={(e) => {
                            router.push(pathname + '?' + createQueryString('page', (e.currentTarget.elements[0] as HTMLInputElement).value))
                        }}
                        aria-label="page select"
                    >
                        <TextField aria-label="page number" className={s.paginationTextField}>
                            <Input name="pageNumber" type="tel" pattern="\d*" className={s.paginationInput} placeholder="..." size={0} />
                        </TextField>
                    </Form>
                    <Tabs selectedKey={pageIndex} orientation="horizontal">
                        <TabList className={s.paginationPages} items={Array.from(Array(3)).map((e, i) => ({ id: i + pageIndex - 1 }))}>
                            {item => (
                                <Tab className={s.paginationPage} href={pathname + '?' + createQueryString('page', `${item.id}`)}>
                                    {item.id}
                                </Tab>
                            )}
                        </TabList>
                    </Tabs>
                    <Form
                        onSubmit={(e) => {
                            router.push(pathname + '?' + createQueryString('page', (e.currentTarget.elements[0] as HTMLInputElement).value))
                        }}
                        aria-label="page select"
                    >
                        <TextField aria-label="page number" className={s.paginationTextField}>
                            <Input name="pageNumber" type="tel" pattern="\d*" className={s.paginationInput} placeholder="..." size={0} />
                        </TextField>
                    </Form>
                    <AriaLink className={s.paginationPage} href={pathname + '?' + createQueryString('page', `${pageCount}`)}>
                        {pageCount}
                    </AriaLink>
                </>
            )
        }
    }
}