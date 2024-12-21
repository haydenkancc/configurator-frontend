import {TableColumn} from '@/server/models';

export const NandTypeColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Type', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface NandTypeListItem {
    id: number;
    name: string;
}

export interface NandTypeDto {
    id: number;
    name: string;
}

export interface NandTypeDbo {
    name: string;
}