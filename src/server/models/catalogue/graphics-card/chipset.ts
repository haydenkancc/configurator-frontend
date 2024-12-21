import {TableColumn} from '@/server/models';

export const ChipsetColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Chipset', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface ChipsetListItem {
    id: number;
    name: string;
}

export interface ChipsetDto {
    id: number;
    name: string;
}

export interface ChipsetDbo {
    name: string;
}
