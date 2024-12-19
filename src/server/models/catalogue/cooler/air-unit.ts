import {BaseUnitDbo, BaseUnitDto} from '.';

export interface AirUnitDto extends BaseUnitDto {
    height: number;
    limitsMemoryHeight: boolean;
    maximumMemoryHeight: number | null;
}

export interface AirUnitDbo extends BaseUnitDbo {
    height: number;
    limitsMemoryHeight: boolean;
    maximumMemoryHeight: number | null;
}