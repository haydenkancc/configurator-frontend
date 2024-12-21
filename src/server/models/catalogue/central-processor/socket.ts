import {TableColumn} from '@/server/models';

export const SocketColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Socket', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface SocketListItem {
    id: number;
    name: string;
}

export interface SocketDto {
    id: number;
    name: string;
}

export interface SocketDbo {
    name: string;
}