import {BaseUnitDbo, BaseUnitDto, RadiatorSizeDto} from '.';

export interface LiquidUnitDto extends BaseUnitDto {
    length: number;
    width: number;
    height: number;
    radiatorSize: RadiatorSizeDto;
}

export interface LiquidUnitDbo extends BaseUnitDbo {
    radiatorSizeID: number;
    length: number;
    width: number;
    height: number;
}