import { IO } from "..";


export interface PackConnectorDto {
    connector: IO.ConnectorDtoSimple;
    connectorCount: number;
}

export interface PackConnectorDbo {
    connectorID: number;
    connectorCount: number;
}