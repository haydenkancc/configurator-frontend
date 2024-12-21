import {TableColumn} from '@/server/models';

export const TypeColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Type', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface TypeListItem {
    id: number;
    name: string;
}

export interface TypeDto {
    id: number;
    name: string;
}

export interface TypeDbo {
    name: string;
}