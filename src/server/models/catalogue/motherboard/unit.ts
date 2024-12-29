import { General, IO, M2, Pcie, PowerSupply, CentralProcessor, Memory } from '..'
import {
    ChipsetDto, ChipsetDtoSimple,
    FormFactorDto,
    UnitIOConnectorDbo,
    UnitIOConnectorDto,
    UnitM2SlotDbo,
    UnitM2SlotDto, UnitPcieSlotDbo,
    UnitPcieSlotDto, UnitPowerSupplyConnectorDbo, UnitPowerSupplyConnectorDto
} from '.';
import {TableColumn} from '@/server/models';

export const UnitColumns : TableColumn[] = [
    { name: 'Name', id: 'name', isRowHeader: true },
    { name: 'Socket', id: 'socket' },
    { name: 'Form Factor', id: 'formFactor' },
    { name: 'Max Memory', id: 'memoryTotalCapacity' },
    { name: 'Memory Slots', id: 'memorySlotCount'},
    { name: 'Price', id: 'price' }
]

export interface UnitListItem extends General.ComponentListItem {
    socket: string;
    formFactor: string;
    memoryTotalCapacity: string;
    memorySlotCount: number;
}

export interface UnitParams {
    component: General.ComponentParams;
    ioConnectors: IO.ConnectorDtoSimple[];
    m2Slots: M2.SlotDtoSimple[];
    pcieSlots: Pcie.SlotDtoSimple[];
    powerSupplyConnectors: PowerSupply.ConnectorDtoSimple[];
    chipsets: ChipsetDtoSimple[];
    formFactors: FormFactorDto[];
    series: CentralProcessor.SeriesDto[];
    processors: CentralProcessor.UnitDtoSimple[];
    coreFamilies: CentralProcessor.CoreFamilyDtoSimple[];
    memoryFormFactors: Memory.FormFactorDto[];
    memoryTypes: Memory.TypeDto[];
}

export interface UnitDto {
    component: General.ComponentDto;
    ioConnectors: UnitIOConnectorDto[];
    m2Slots: UnitM2SlotDto[];
    pcieSlots: UnitPcieSlotDto[];
    powerSupplyConnectors: UnitPowerSupplyConnectorDto[];
    chipset: ChipsetDto;
    formFactor: FormFactorDto;
    channelCount: number;
    memoryFormFactor: Memory.FormFactorDto;
    memoryType: Memory.TypeDto;
    memoryTotalCapacity: number;
    memorySlotCount: number;
    supportECCMemory: boolean;
    supportNonECCMemory: boolean;
    supportBufferedMemory: boolean;
    supportUnbufferedMemory: boolean;
}

export interface UnitDbo {
    component: General.ComponentDbo;
    ioConnectors: UnitIOConnectorDbo[];
    m2Slots: UnitM2SlotDbo[];
    pcieSlots: UnitPcieSlotDbo[];
    powerSupplyConnectors: UnitPowerSupplyConnectorDbo[];
    chipsetID: number;
    formFactorID: number;
    channelCount: number;
    memoryFormFactorID: number;
    memoryTypeID: number;
    memoryTotalCapacity: number;
    memorySlotCount: number;
    supportECCMemory: boolean;
    supportNonECCMemory: boolean;
    supportBufferedMemory: boolean;
    supportUnbufferedMemory: boolean;
}
