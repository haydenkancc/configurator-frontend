import { PowerSupply } from '..';

export interface UnitPowerSupplyConnectorDto {
    connector: PowerSupply.ConnectorDtoSimple;
    connectorCount: number;
}

export interface UnitPowerSupplyConnectorDbo {
    connectorID: number;
    connectorCount: number;
}