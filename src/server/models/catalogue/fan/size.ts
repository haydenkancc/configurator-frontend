import {TableColumn} from '@/server/models';

export const SizeColumns : TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Size', id: 'sideLength', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface SizeListItem {
    id: number;
    sideLength: string;
}

export interface SizeDto {
    id: number;
    sideLength: number;
}

export interface SizeDbo {
    sideLength: number;
}