import {SizeDto, VersionDto} from '.';

export interface SlotParams {
    sizes: SizeDto[];
    versions: VersionDto[];
}

export interface SlotListItem {
    id: number;
    slotSize: string;
    version: string;
}

export interface SlotDtoSimple {
    id: number;
    name: string;
}

export interface SlotDto {
    id: number;
    laneSize: SizeDto;
    physicalSize: SizeDto;
    version: VersionDto;
}

export interface SlotDbo {
    laneSizeId: number;
    physicalSizeId: number;
    versionId: number;
}