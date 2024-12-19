import {ChannelDto, CoreFamilyDto, SeriesDto, SocketDto} from '.';
import { General } from '..';

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
    channels: ChannelDto[];
    coreFamilies: CoreFamilyDto[];
}

export interface UnitDtoSimple {
    componentID: number;
    name: string;
}

export interface UnitDto {
    component: General.ComponentDto;
    socket: SocketDto;
    series: SeriesDto;
    channel: ChannelDto;
    coreFamily: CoreFamilyDto;

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