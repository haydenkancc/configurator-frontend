import {TableColumn} from '@/server/models';

export const ManufacturerColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Manufacturer', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface ManufacturerListItem {
    id: number;
    name: string;
}

export interface ManufacturerDto {
    id: number;
    name: string;
}

export interface ManufacturerDbo {
    name: string;
}