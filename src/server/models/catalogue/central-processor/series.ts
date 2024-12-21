import {TableColumn} from '@/server/models';

export const SeriesColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Series', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface SeriesListItem {
    id: number;
    name: string;
}

export interface SeriesDto {
    id: number;
    name: string;
}

export interface SeriesDbo {
    name: string;
}