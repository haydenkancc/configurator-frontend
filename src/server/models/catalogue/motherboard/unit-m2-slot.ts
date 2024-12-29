import {M2, CentralProcessor, Pcie} from '..';

export interface UnitM2SlotDto {
    slot: M2.SlotDtoSimple;
    slotPosition: number;
    configurationNumber: number;
    series: CentralProcessor.SeriesDto[];
    processors: CentralProcessor.UnitDtoSimple[];
    coreFamilies: CentralProcessor.CoreFamilyDtoSimple[];
}

export interface UnitM2SlotFrontend {
    slotID: number;
    slotPosition: number;
    configurationNumber: number;
    series: CentralProcessor.SeriesDto[];
    processors: CentralProcessor.UnitDtoSimple[];
    coreFamilies: CentralProcessor.CoreFamilyDtoSimple[];
}

export interface UnitM2SlotDbo {
    slotID: number;
    slotPosition: number;
    configurationNumber: number;
    seriesIDs: number[];
    processorIDs: number[];
    coreFamilyIDs: number[];
}
