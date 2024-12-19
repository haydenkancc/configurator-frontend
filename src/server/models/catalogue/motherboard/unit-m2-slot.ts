import { M2, CentralProcessor } from '..';

export interface UnitM2SlotDto {
    slot: M2.SlotDto;
    slotPosition: number;
    configurationNumber: number;
    series: CentralProcessor.SeriesDto[];
    processors: CentralProcessor.UnitDtoSimple[];
    coreFamilies: CentralProcessor.CoreFamilyDto[];
}

export interface UnitM2SlotDbo {
    slotID: number;
    slotPosition: number;
    configurationNumber: number;
    seriesIDs: number[];
    processorIDs: number[];
    coreFamilyIDs: number[];
}
