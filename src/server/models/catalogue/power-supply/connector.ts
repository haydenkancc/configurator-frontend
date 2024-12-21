import {TableColumn} from '@/server/models';

export const ConnectorColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Connector', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface ConnectorListItem {
    id: number;
    name: string;
}

export interface ConnectorParams {
    connectors: ConnectorDtoSimple[];
}

export interface ConnectorDto {
    id: number;
    name: string;
    compatibleConnectors: ConnectorDtoSimple[];
}

export interface ConnectorDtoSimple {
    id: number;
    name: string;
}

export interface ConnectorDbo {
    name: string;
    compatibleConnectorIDs: number[];
}
