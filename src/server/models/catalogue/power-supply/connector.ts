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
    compatibleConnectorIds: number[];
}
