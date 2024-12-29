import {TableColumn} from '@/server/models';

export const FormFactorColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Form Factor', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface FormFactorListItem {
    id: number;
    name: string;
}

export interface FormFactorDto {
    id: number;
    name: string;
}

export interface FormFactorDbo {
    name: string;
}