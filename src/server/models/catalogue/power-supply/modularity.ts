import {TableColumn} from '@/server/models';

export const ModularityColumns: TableColumn[] = [
    {name: 'ID', id: 'id', isRowHeader: true},
    {name: 'Modularity', id: 'name'},
]

export interface ModularityListItem {
    id: number;
    name: string;
}

export interface ModularityDto {
    id: number;
    name: string;
}

export interface ModularityDbo {
    name: string;
}
