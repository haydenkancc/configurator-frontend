export interface PaginatedList<T> {
    pageIndex: number;
    totalPages: number;
    totalItems: number;
    items: Array<T>
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

export interface PutFormProps<T, R, Q = {}> {
    item: T | null;
    action: (body: RecursivePartial<R>) => Promise<boolean>;
    params?: Q | null;
}

export interface PostFormProps<R, Q = {}> {
    action: (body: RecursivePartial<R>) => Promise<number | null>
    params?: Q | null;
}

export interface TableColumn {
    name: string,
    id: string;
    isRowHeader?: boolean;
    size?: 'small' | 'medium' | 'large' | 'max';
}
