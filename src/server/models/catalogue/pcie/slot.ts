import {SizeDto, VersionDto} from '.';
import {TableColumn} from "@/server/models";

export const PCIeSlotColumns: TableColumn[] = [
    {name: 'ID', id: 'id', isRowHeader: true},
    {name: 'Version', id: 'version' },
    {name: 'Slot size', id: 'slotSize' },
]

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
    laneSizeID: number;
    physicalSizeID: number;
    versionID: number;
}