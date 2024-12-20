import {TableColumn} from "@/server/models";

export const SizeColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Lane count', id: 'laneCount', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface SizeListItem {
    id: number;
    laneCount: string;
}

export interface SizeDto {
    id: number;
    laneCount: number;
}

export interface SizeDbo {
    laneCount: number;
}