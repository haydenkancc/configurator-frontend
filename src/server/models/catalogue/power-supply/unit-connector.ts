import {ConnectorDtoSimple} from '.';

export interface UnitConnectorDto {
    connector: ConnectorDtoSimple;
    connectorCount: number;
    splitCount: number;
}

export interface UnitConnectorDbo {
    connectorID: number;
    connectorCount: number;
    splitCount: number;
}
