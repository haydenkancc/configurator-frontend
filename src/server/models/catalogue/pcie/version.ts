import {TableColumn} from "@/server/models";

export const PCIeVersionColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Version', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface VersionListItem {
    id: number;
    name: string;
}

export interface VersionDto {
    id: number;
    name: string;
}

export interface VersionDbo {
    name: string;
}