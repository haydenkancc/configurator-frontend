import {TableColumn} from '@/server/models';
import {
    Component,
    ComponentDbo,
    ComponentParams,
    IComponent,
    IComponentDbo, IComponentParams,
    MemoryCapacity
} from '@/server/models/components/index';

export const CentralProcessorChannelColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Channels', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface CentralProcessorChannelRow {
    id: number;
    name: string;
}

export interface CentralProcessorChannel {
    id: number;
    name: string;
}

export interface CentralProcessorChannelDbo {
    name: string;
}

export const CentralProcessorSeriesColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Series', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface CentralProcessorSeriesRow {
    id: number;
    name: string;
}

export interface CentralProcessorSeries {
    id: number;
    name: string;
}

export interface CentralProcessorSeriesDbo {
    name: string;
}

export const CentralProcessorSocketColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Socket', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface CentralProcessorSocketRow {
    id: number;
    name: string;
}

export interface CentralProcessorSocket {
    id: number;
    name: string;
}

export interface CentralProcessorSocketDbo {
    name: string;
}

export const CentralProcessorMicroarchitectureColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Microarchitecture', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface CentralProcessorMicroarchitectureRow {
    id: number;
    name: string;
}

export interface CentralProcessorMicroarchitecture {
    id: number;
    name: string;
}

export interface CentralProcessorMicroarchitectureDbo {
    name: string;
}

export const CentralProcessorCoreFamilyColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Name', id: 'name', size: 'medium'},
    { name: 'Microarchitecture', id: 'microarchitecture', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface CentralProcessorCoreFamilyRow {
    id: number;
    name: string;
    microarchitecture: string;
}

export interface CentralProcessorCoreFamily {
    id: number;
    name: string;
    microarchitecture: CentralProcessorMicroarchitecture;
}

export interface CentralProcessorCoreFamilyDbo {
    name: string;
    microarchitectureID: number;
}

export interface CentralProcessorCoreFamilyParams {
    microarchitectures: CentralProcessorMicroarchitecture[];
}

export const CentralProcessorUnitColumns: TableColumn[] = [
    { name: 'Name', id: 'name', isRowHeader: true, size: 'large' },
    { name: 'Core Count', id: 'coreCount' },
    { name: 'Performance Core Clock', id: 'performanceCoreClock' },
    { name: 'Performance Core Boost Clock', id: 'performanceCoreBoostClock' },
    { name: 'Microarchitecture', id: 'microarchitecture' },
    { name: 'TDP', id: 'totalPower' },
    { name: 'Integrated Graphics', id: 'integratedGraphics' },
    { name: 'Price', id: 'price' },
]

export interface CentralProcessorUnitRow {
    name: string;
    coreCount: number;
    performanceCoreClock: string;
    performanceCoreBoostClock: string;
    microarchitecture: string;
    totalPower: string;
    integratedGraphics: string;
    price: string;
}

export interface CentralProcessorUnit extends IComponent {
    socket: CentralProcessorSocket;
    series: CentralProcessorSeries;
    channel: CentralProcessorChannel;
    coreFamily: CentralProcessorCoreFamily;
    maxTotalMemoryCapacity: number;
    totalPower: number;
    hasIntegratedGraphics: boolean;
    coolerIncluded: boolean;
    supportECCMemory: boolean;
    supportNonECCMemory: boolean;
    supportBufferedMemory: boolean;
    supportUnbufferedMemory: boolean;
    coreCount: number;
    threadCount: number;
    performanceCoreClock: number;
    performanceCoreBoostClock: number;
    hasEfficiencyCores: boolean;
    efficiencyCoreClock: number;
    efficiencyCoreBoostClock: number;
    l2Cache: number;
    l3Cache: number;
    simultaneousMultithreading: boolean;
}

export interface CentralProcessorUnitDbo extends IComponentDbo {
    socketID: number;
    seriesID: number;
    channelID: number;
    coreFamilyID: number;
    maxTotalMemoryCapacityID: number;
    totalPower: number;
    hasIntegratedGraphics: boolean;
    coolerIncluded: boolean;
    supportECCMemory: boolean;
    supportNonECCMemory: boolean;
    supportBufferedMemory: boolean;
    supportUnbufferedMemory: boolean;
    coreCount: number;
    threadCount: number;
    performanceCoreClock: number;
    performanceCoreBoostClock: number;
    hasEfficiencyCores: boolean;
    efficiencyCoreClock: number;
    efficiencyCoreBoostClock: number;
    l2Cache: number;
    l3Cache: number;
    simultaneousMultithreading: boolean;
}

export interface CentralProcessorUnitParams extends IComponentParams {
    sockets: CentralProcessorSocket[];
    series: CentralProcessorSeries[];
    channels: CentralProcessorChannel[];
    coreFamilies: CentralProcessorCoreFamily[];
    memoryCapacities: MemoryCapacity[];
}

export interface CentralProcessorUnitSimple {
    id: number;
    name: string;
}