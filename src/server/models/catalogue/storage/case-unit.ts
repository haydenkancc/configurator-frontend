import {BaseUnitDbo, BaseUnitDto, FormFactorDto} from '.';
import { IO, PowerSupply } from '..';

export interface CaseUnitDto extends BaseUnitDto {
    formFactor: FormFactorDto;
    ioConnector: IO.ConnectorDtoSimple;
    powerSupplyConnector: PowerSupply.ConnectorDtoSimple;
}

export interface CaseUnitDbo extends BaseUnitDbo {
    formFactorID: number;
    ioConnectorID: number;
    powerSupplyConnectorID: number;
}