import { IO } from '..';

export interface UnitConnectorDto {
    connector: IO.ConnectorDtoSimple;
    connectorCount: number;
}

export interface UnitConnectorDbo {
    connectorID: number;
    connectorCount: number;
}