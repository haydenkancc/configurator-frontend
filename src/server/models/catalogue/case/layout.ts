import {LayoutPanelDbo, LayoutPanelDto, StorageAreaDbo, StorageAreaDto} from '.';

export interface LayoutDto {
    panels: LayoutPanelDto[];
    storageAreas: StorageAreaDto[];
    maxPowerSupplyLength: number;
    maxAirCoolerHeight: number;
    maxGraphicsProcessorUnitLength: number;
}

export interface LayoutDbo {
    panels: LayoutPanelDbo[];
    storageAreas: StorageAreaDbo[];
    maxPowerSupplyLength: number;
    maxAirCoolerHeight: number;
    maxGraphicsProcessorUnitLength: number;
}