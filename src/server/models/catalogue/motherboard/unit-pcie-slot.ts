import { Pcie, CentralProcessor } from '..';

export interface UnitPcieSlotDto {
    slot: Pcie.SlotDto;
    slotPosition: number;
    configurationNumber: number;
    series: CentralProcessor.SeriesDto[];
    processors: CentralProcessor.UnitDtoSimple[];
    coreFamilies: CentralProcessor.CoreFamilyDto[];
}

export interface UnitPcieSlotDbo {
    slotID: number;
    slotPosition: number;
    configurationNumber: number;
    seriesIDs: number[];
    processorIDs: number[];
    coreFamilyIDs: number[];
}
