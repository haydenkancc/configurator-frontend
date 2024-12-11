import {TableColumn} from '@/server/models';
import {
    CentralProcessorChannel, CentralProcessorCoreFamily,
    CentralProcessorMicroarchitecture, CentralProcessorSeries,
    CentralProcessorSocket, CentralProcessorUnit, CentralProcessorUnitSimple
} from '@/server/models/components/central-processor';
import {IComponent, IComponentDbo, IComponentParams} from '@/server/models/components/component';
import {MemoryCapacity, MemoryFormFactor, MemoryType} from '@/server/models/components/memory';
import {IOConnector, IOConnectorBase} from '@/server/models/components/io';
import {M2Slot, M2SlotSimple} from '@/server/models/components/m2';
import {PCIeSlot, PCIeSlotSimple} from '@/server/models/components/pcie';
import {PowerSupplyConnector} from '@/server/models/components/power-supply';

export const MotherboardFormFactorColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Form Factor', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface MotherboardFormFactorRow {
    id: number;
    name: string;
}

export interface MotherboardFormFactor {
    id: number;
    name: string;
}

export interface MotherboardFormFactorDbo {
    name: string;
}

export const MotherboardChipsetColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Chipset', id: 'name', size: 'medium'},
    { name: 'Socket', id: 'socket', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface MotherboardChipsetRow {
    id: number;
    name: string;
    socket: string;
}

export interface MotherboardChipset {
    id: number;
    name: string;
    socket: CentralProcessorSocket;
}

export interface MotherboardChipsetDbo {
    name: string;
    socketID: number;
}

export interface MotherboardChipsetParams {
    sockets: CentralProcessorSocket[];
}

export const MotherboardUnitColumns : TableColumn[] = [
    { name: 'Name', id: 'name', isRowHeader: true },
    { name: 'Socket', id: 'socket' },
    { name: 'Form Factor', id: 'formFactor' },
    { name: 'Max Memory', id: 'memoryTotalCapacity' },
    { name: 'Memory Slots', id: 'memorySlotCount'},
    { name: 'Price', id: 'price' }
]

export interface MotherboardUnitRow {
    name: string;
    socket: string;
    formFactor: string;
    memoryTotalCapacity: string;
    memorySlotCount: number;
    price: string;
}

export interface MotherboardUnit extends IComponent {
    ioConnectors: MotherboardUnitIOConnector[];
    m2Slots: MotherboardUnitM2Slot[];
    pcieSlots: MotherboardUnitPCIeSlot[];
    powerSupplyConnectors: MotherboardUnitPowerSupplyConnector[];
    chipset: MotherboardChipset;
    formFactor: MotherboardFormFactor;
    channel: CentralProcessorChannel;
    memoryFormFactor: MemoryFormFactor;
    memoryType: MemoryType;
    memoryTotalCapacity: number;
    memorySlotCount: number;
    supportECCMemory: boolean;
    supportNonECCMemory: boolean;
    supportBufferedMemory: boolean;
    supportUnbufferedMemory: boolean;
}

export interface MotherboardUnitDbo extends IComponentDbo {
    ioConnectors: MotherboardUnitIOConnectorDbo[];
    m2Slots: MotherboardUnitM2SlotDbo[];
    pcieSlots: MotherboardUnitPCIeSlotDbo[];
    powerSupplyConnectors: MotherboardUnitPowerSupplyConnectorDbo[];
    chipsetID: number;
    formFactorID: number;
    channelID: number;
    memoryFormFactorID: number;
    memoryTypeID: number;
    memoryTotalCapacityID: number;
    memorySlotCount: number;
    supportECCMemory: boolean;
    supportNonECCMemory: boolean;
    supportBufferedMemory: boolean;
    supportUnbufferedMemory: boolean;
}

export interface MotherboardUnitIOConnector {
    connectorID: number;
    connectorCount: number;
}

export interface MotherboardUnitIOConnectorDbo {
    connectorID: number;
    connectorCount: number;
}

export interface MotherboardUnitM2Slot {
    slotID: number;
    slotPosition: number;
    configurationNumber: number;
    series: CentralProcessorSeries[];
    processors: CentralProcessorUnit[];
    coreFamilies: CentralProcessorCoreFamily[];
}

export interface MotherboardUnitM2SlotDbo {
    slotID: number;
    slotPosition: number;
    configurationNumber: number;
    seriesIDs: number[];
    processorIDs: number[];
    coreFamilyIDs: number[];
}

export interface MotherboardUnitPCIeSlot {
    slotID: number;
    slotPosition: number;
    configurationNumber: number;
    series: CentralProcessorSeries[];
    processors: CentralProcessorUnit[];
    coreFamilies: CentralProcessorCoreFamily[];
}

export interface MotherboardUnitPCIeSlotDbo {
    slotID: number;
    slotPosition: number;
    configurationNumber: number;
    seriesIDs: number[];
    processorIDs: number[];
    coreFamilyIDs: number[];
}


export interface MotherboardUnitSlotPositionListDataItem {
    id: number;
    slotPosition: number;
    open: boolean;
}

export interface MotherboardUnitSlotPositionSlotListDataItem {
    id: number;
    slotPositionID: number;
    slotID: number;
    open: boolean;
    configurationOpen: boolean;
    seriesOpen: boolean;
    coreFamilyOpen: boolean;
    processorOpen: boolean;
}

export interface MotherboardUnitSlotConfigurationListDataItem {
    id: number;
    unitSlotID: number;
    configurationNumber: number;
}

export interface MotherboardUnitSlotSeriesListDataItem {
    id: number;
    unitSlotID: number;
    seriesID: number;
}

export interface MotherboardUnitSlotProcessorListDataItem {
    id: number;
    unitSlotID: number;
    componentID: number;
}

export interface MotherboardUnitSlotCoreFamilyListDataItem {
    id: number;
    unitSlotID: number;
    coreFamilyID: number;
}

export interface MotherboardUnitPowerSupplyConnector {
    connectorID: number;
    connectorCount: number;
}

export interface MotherboardUnitPowerSupplyConnectorDbo {
    connectorID: number;
    connectorCount: number;
}

export interface MotherboardUnitParams extends IComponentParams {
    ioConnectors: IOConnectorBase[]
    m2Slots: M2SlotSimple[]
    pcieSlots: PCIeSlotSimple[]
    powerSupplyConnectors: PowerSupplyConnector[]
    series: CentralProcessorSeries[]
    processors: CentralProcessorUnitSimple[]
    coreFamilies: CentralProcessorCoreFamily[];
    chipsets: MotherboardChipset[]
    formFactors: MotherboardFormFactor[]
    channels: CentralProcessorChannel[]
    memoryFormFactors: MemoryFormFactor[]
    memoryTypes: MemoryType[]
    memoryCapacities: MemoryCapacity[]
}





