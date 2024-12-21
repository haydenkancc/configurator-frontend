import {TableColumn} from '@/server/models';

export const MicroarchitectureColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Microarchitecture', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface MicroarchitectureListItem {
    id: number;
    name: string;
}

export interface MicroarchitectureDto {
    id: number;
    name: string;
}

export interface MicroarchitectureDbo {
    name: string;
}