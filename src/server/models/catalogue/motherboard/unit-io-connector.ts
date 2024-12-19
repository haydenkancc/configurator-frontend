import { IO } from '..';

export interface UnitIOConnectorDto {
    connector: IO.ConnectorDtoSimple;
    connectorCount: number;
}

export interface UnitIOConnectorDbo {
    connectorID: number;
    connectorCount: number;
}