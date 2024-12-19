import { General, CentralProcessor, IO } from '..';
import {
    AirUnitDbo,
    AirUnitDto,
    LiquidUnitDbo,
    LiquidUnitDto,
    RadiatorSizeDto,
    UnitConnectorDbo,
    UnitConnectorDto
} from '.';

export enum Type {
    Air = 0,
    Liquid = 1,
}

export interface UnitListItem extends General.ComponentListItem {
    fanRpm: string;
    fanAirflow: string;
    fanNoiseLevel: string;
}

export interface UnitDto {
    type: Type;
    liquidUnit?: LiquidUnitDto;
    airUnit?: AirUnitDto;
}

export interface BaseUnitDto {
    component: General.ComponentDto;
    sockets: CentralProcessor.SocketDto[];
    connectors?: UnitConnectorDto[];
    isPassive: boolean;
    fanCount?: number;
    fanRpm?: string;
    fanAirflow?: string;
    fanNoiseLevel?: string;
    fanStaticPressure?: string;
}

export interface UnitParams {
    component: General.ComponentParams;
    sockets: CentralProcessor.SocketDto[];
    connectors: IO.ConnectorDtoSimple[];
    radiatorSizes: RadiatorSizeDto[];
}

export interface UnitDbo {
    type: Type;
    liquidUnit?: LiquidUnitDbo;
    airUnit?: AirUnitDbo;
}

export interface BaseUnitDbo {
    component: General.ComponentDbo;
    connectors: UnitConnectorDbo[];
    socketIDs: number[];
    isPassive: boolean;
    fanCount?: number;
    fanRpm?: string;
    fanAirflow?: string;
    fanNoiseLevel?: string;
    fanStaticPressure?: string;
}
