import { General } from '..';
import {FormFactorDto, TypeDto} from '.';
import {TableColumn} from '@/server/models';

export const KitColumns: TableColumn[] = [
    {name: 'Name', id: 'name', isRowHeader: true, size: 'max'},
    {name: 'Modules', id: 'modules', size: 'small'},
    {name: 'Speed', id: 'speed', size: 'small'},
    {name: 'CAS Latency', id: 'casLatency', size: 'small'},
    {name: 'First Word Latency', id: 'firstWordLatency', size: 'small'},
    {name: 'Colour', id: 'colour', size: 'small'},
    {name: 'Price', id: 'price', size: 'small'},
]

export interface KitListItem extends General.ComponentListItem {
    modules: string;
    speed: string;
    casLatency: string;
    firstWordLatency: string;
}

export interface KitParams {
    component: General.ComponentParams;
    formFactors: FormFactorDto[];
    types: TypeDto[];
}

export interface KitDto {
    component: General.ComponentDto;
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
    formFactor: FormFactorDto;
    type: TypeDto;
}

export interface KitDbo {
    component: General.ComponentDbo;
    formFactorID: number;
    typeID: number;
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
}