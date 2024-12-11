import {TableColumn} from '@/server/models';

export const ManufacturerColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Name', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface ManufacturerRow {
    id: number;
    name: string;
}

export interface Manufacturer {
    id: number;
    name: string;
}

export interface ManufacturerDbo {
    name: string;
}