export interface PaginatedList<T> {
    pageIndex: number;
    totalPages: number;
    totalItems: number;
    items: Array<T>
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export type RecursiveNullable<T> = {
    [P in keyof T]: T[P] extends (number | string | boolean | symbol) ? T[P] | null :  RecursiveNullable<T[P]>
};

export type RecursiveNullableNoIterable<T> = {
    [P in keyof T]: T[P] extends (number | string | boolean | symbol) ? T[P] | null : T[P] extends Iterable<any> ? T[P] : RecursiveNullableNoIterable<T[P]>
}

export type RecursiveMap<T> = Map<number, {
    [P in keyof T]: T[P] extends Iterable<any> ? T[P] extends string ? T[P] : RecursiveMap<T[P][any]> : T[P]
}>

export interface PutFormProps<T, R, Q> {
    item: T | null;
    action: (body: RecursiveNullable<R>) => Promise<boolean>;
    params: Q | null;
}

export interface PostFormProps<R, Q> {
    action: (body: RecursiveNullable<R>) => Promise<number | null>
    params: Q | null;
}

export interface TableColumn {
    name: string,
    id: string;
    isRowHeader?: boolean;
    size?: 'small' | 'medium' | 'large' | 'max';
}
