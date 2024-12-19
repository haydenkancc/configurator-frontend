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
    bracketID: number;
    versionID: number;
    laneSizeID: number;
    physicalSizeID: number;
    expansionSlotWidth: number;
}