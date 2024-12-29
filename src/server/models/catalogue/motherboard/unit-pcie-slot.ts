import { Pcie, CentralProcessor } from '..';

export interface UnitPcieSlotDto {
    slot: Pcie.SlotDtoSimple;
    slotPosition: number;
    configurationNumber: number;
    series: CentralProcessor.SeriesDto[];
    processors: CentralProcessor.UnitDtoSimple[];
    coreFamilies: CentralProcessor.CoreFamilyDtoSimple[];
}

export interface UnitPcieSlotFrontend {
    slotID: number;
    slotPosition: number;
    configurationNumber: number;
    series: CentralProcessor.SeriesDto[];
    processors: CentralProcessor.UnitDtoSimple[];
    coreFamilies: CentralProcessor.CoreFamilyDtoSimple[];
}

export interface UnitPcieSlotDbo {
    slotID: number;
    slotPosition: number;
    configurationNumber: number;
    seriesIDs: number[];
    processorIDs: number[];
    coreFamilyIDs: number[];
}
