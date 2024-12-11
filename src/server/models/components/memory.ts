import {TableColumn} from '@/server/models';
import {
    Component,
    ComponentDbo,
    ComponentParams,
    IComponent,
    IComponentDbo,
    IComponentParams
} from '@/server/models/components';

export const MemoryFormFactorColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Form Factor', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface MemoryFormFactorRow {
    id: number;
    name: string;
}

export interface MemoryFormFactor {
    id: number;
    name: string;
}

export interface MemoryFormFactorDbo {
    name: string;
}


export const MemoryTypeColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Type', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface MemoryTypeRow {
    id: number;
    name: string;
}

export interface MemoryType {
    id: number;
    name: string;
}

export interface MemoryTypeDbo {
    name: string;
}

export const MemoryCapacityColumns: TableColumn[] = [
    {name: 'Size', id: 'size', isRowHeader: true},
]

export interface MemoryCapacityRow {
    id: number;
    size: string;
}

export interface MemoryCapacity {
    size: number;
}


export interface MemoryCapacityDbo {
    size: number;
}

export const MemoryKitColumns: TableColumn[] = [
    {name: 'Name', id: 'name', isRowHeader: true, size: 'large'},
    {name: 'Modules', id: 'modules', size: 'small'},
    {name: 'Speed', id: 'speed', size: 'small'},
    {name: 'CAS Latency', id: 'casLatency', size: 'small'},
    {name: 'First Word Latency', id: 'firstWordLatency', size: 'small'},
    {name: 'Price', id: 'price', size: 'small'},
]

export interface MemoryKitRow {
    name: string;
    price: string;
    modules: string;
    speed: string;
    casLatency: string;
    firstWordLatency: string;
}

export interface MemoryKit extends IComponent {
    capacity: number;
    clockFrequency: number;
    height: number;
    isECC: boolean;
    isBuffered: boolean;
    moduleCount: number;
    casLatency: number;
    firstWordLatency: number;
    voltage: number;
    timing: string;
    formFactor: MemoryFormFactor;
    type: MemoryType;
}

export interface MemoryKitDbo extends IComponentDbo {
    formFactorID: number;
    typeID: number;
    capacityID: number;
    clockFrequency: number;
    height: number;
    isECC: boolean;
    isBuffered: boolean;
    moduleCount: number;
    casLatency: number;
    firstWordLatency: number;
    voltage: number;
    timing: string;
}

export interface MemoryKitParams extends IComponentParams {
    types: MemoryType[];
    formFactors: MemoryFormFactor[];
    capacities: MemoryCapacity[];
}