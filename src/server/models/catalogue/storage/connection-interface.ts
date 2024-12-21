import {TableColumn} from '@/server/models';

export const ConnectionInterfaceColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Interface', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface ConnectionInterfaceListItem {
    id: number;
    name: string;
}

export interface ConnectionInterfaceDto {
    id: number;
    name: string;
}

export interface ConnectionInterfaceDbo {
    name: string;
}