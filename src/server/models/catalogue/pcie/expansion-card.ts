import {BracketDto, SizeDto, VersionDto} from '.';

export interface ExpansionCardParams {
    brackets: BracketDto[];
    versions: VersionDto[];
    sizes: SizeDto[];
}

export interface ExpansionCardDto {
    bracket: BracketDto;
    version: VersionDto;
    laneSize: SizeDto;
    physicalSize: SizeDto;
    expansionSlotWidth: number;
}

export interface ExpansionCardDbo {
    bracketId: number;
    versionId: number;
    laneSizeId: number;
    physicalSizeId: number;
    expansionSlotWidth: number;
}