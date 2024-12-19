import { PowerSupply } from '..';

export interface ConfigurationConnectorDto {
    connector: PowerSupply.ConnectorDtoSimple;
    connectorCount: number;
}

export interface ConfigurationConnectorDbo {
    connectorID: number;
    connectorCount: number;
}