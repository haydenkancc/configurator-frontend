import {TableColumn} from "@/server/models";

export const BracketColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Bracket', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface BracketListItem {
    id: number;
    name: string;
}

export interface BracketDto {
    id: number;
    name: string;
}

export interface BracketDbo {
    name: string;
}
