import { M2, General, IO, PowerSupply } from '..';
import {
    CaseUnitDbo,
    CaseUnitDto,
    ConnectionInterfaceDto,
    DriveDbo,
    DriveDto,
    DriveParams,
    FormFactorDto, M2UnitDbo,
    M2UnitDto
} from '.';

export enum Location {
    Case = 0,
    M2 = 1,
}

export interface UnitListItem extends General.ComponentListItem {
    capacity: string;
    cache: string;
    formFactor: string;
    connectionInterface: string;
    type: string;
}

export interface UnitDto {
    location: Location;
    caseUnit?: CaseUnitDto;
    m2Unit?: M2UnitDto;
}

export interface BaseUnitDto {
    component: General.ComponentDto;
    drive: DriveDto;
    connectionInterface: ConnectionInterfaceDto;
    capacity: number;
    cache: number;
    readSpeed: number;
    writeSpeed: number;
}

export interface UnitParams {
    component: General.ComponentParams;
    expansionCard: M2.ExpansionCardParams;
    drive: DriveParams;
    connectionInterfaces: ConnectionInterfaceDto[];
    formFactors: FormFactorDto[];
    ioConnectors: IO.ConnectorDtoSimple[];
    powerSupplyConnectors: PowerSupply.ConnectorDtoSimple[];
}

export interface UnitDbo {
    location: Location;
    caseUnit?: CaseUnitDbo;
    m2Unit?: M2UnitDbo;
}

export interface BaseUnitDbo {
    component: General.ComponentDbo;
    drive: DriveDbo;
    connectionInterfaceID: number;
    capacity: number;
    cache: number;
    readSpeed: number;
    writeSpeed: number;
}