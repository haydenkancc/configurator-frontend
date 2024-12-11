import {TableColumn} from '@/server/models';

export const IOConnectorColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Connector', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface IOConnectorRow {
    id: number;
    name: string;
}

export interface IOConnector extends IOConnectorBase {
    compatibleConnectors: IOConnectorBase[];
}

export interface IOConnectorBase {
    id: number;
    name: string;
}

export interface IOConnectorDbo {
    name: string;
    compatibleConnectorIDs: number[];
}

export interface IOConnectorParams {
    connectors: IOConnectorBase[];
}
