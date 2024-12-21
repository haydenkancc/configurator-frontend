import {TableColumn} from '@/server/models';

export const EfficiencyRatingColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Efficiency Rating', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface EfficiencyRatingListItem {
    id: number;
    name: string;
}

export interface EfficiencyRatingDto {
    id: number;
    name: string;
}

export interface EfficiencyRatingDbo {
    name: string;
}
