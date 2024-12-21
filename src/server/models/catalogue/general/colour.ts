import {TableColumn} from '@/server/models';

export const ColourColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Colour', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface ColourListItem {
    id: number;
    name: string;
}

export interface ColourDto {
    id: number;
    name: string;
}

export interface ColourDbo {
    name: string;
}