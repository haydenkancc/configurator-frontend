import {CoreFamilyDto, CoreFamilyDtoSimple, SeriesDto, SocketDto} from '.';
import { General } from '..';
import {TableColumn} from '@/server/models';

export const UnitColumns: TableColumn[] = [
    { name: 'Name', id: 'name', isRowHeader: true, size: 'large' },
    { name: 'Core Count', id: 'coreCount' },
    { name: 'Performance Core Clock', id: 'performanceCoreClock' },
    { name: 'Performance Core Boost Clock', id: 'performanceCoreBoostClock' },
    { name: 'Microarchitecture', id: 'microarchitecture' },
    { name: 'TDP', id: 'totalPower' },
    { name: 'Integrated Graphics', id: 'integratedGraphics' },
    { name: 'Price', id: 'price' },
]

export interface UnitListItem {
    coreCount: string;
    performanceCoreClock: string;
    performanceCoreBoostClock: string;
    totalPower: string;
    microarchitecture: string;
    coreFamily: string;
    integratedGraphics: string;
    name: string;
}

export interface UnitParams {
    component: General.ComponentParams;
    sockets: SocketDto[];
    series: SeriesDto[];
    coreFamilies: CoreFamilyDtoSimple[];
}

export interface UnitDtoSimple {
    componentID: number;
    name: string;
}

export interface UnitDto {
    component: General.ComponentDto;
    socket: SocketDto;
    series: SeriesDto;
    coreFamily: CoreFamilyDto;

    channelCount: number;
    maxTotalMemoryCapacity: number;
    totalPower: number;
    hasIntegratedGraphics: boolean;
    coolerIncluded: boolean;
    supportECCMemory: boolean;
    supportNonECCMemory: boolean;
    supportBufferedMemory: boolean;
    supportUnbufferedMemory: boolean;

    threadCount: number;
    performanceCoreCount: number;
    performanceCoreClock: number;
    performanceCoreBoostClock: number;
    hasEfficiencyCores: boolean;
    efficiencyCoreCount?: number;
    efficiencyCoreClock?: number;
    efficiencyCoreBoostClock?: number;
    l2Cache: number;
    l3Cache: number;
    simultaneousMultithreading: boolean;
}

export interface UnitDbo {
    component: General.ComponentDbo;
    socketID: number;
    seriesID: number;
    coreFamilyID: number;

    channelCount: number;
    maxTotalMemoryCapacity: number;
    totalPower: number;
    hasIntegratedGraphics: boolean;
    coolerIncluded: boolean;
    supportECCMemory: boolean;
    supportNonECCMemory: boolean;
    supportBufferedMemory: boolean;
    supportUnbufferedMemory: boolean;

    threadCount: number;
    performanceCoreCount: number;
    performanceCoreClock: number;
    performanceCoreBoostClock: number;
    hasEfficiencyCores: boolean;
    efficiencyCoreCount: number | null;
    efficiencyCoreClock: number | null;
    efficiencyCoreBoostClock: number | null;
    l2Cache: number;
    l3Cache: number;
    simultaneousMultithreading: boolean;
}