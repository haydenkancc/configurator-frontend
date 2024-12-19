import { General } from '..';
import {FormFactorDto, TypeDto} from '.';


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
    isEcc: boolean;
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
    isEcc: boolean;
    isBuffered: boolean;
    moduleCount: number;
    casLatency: number;
    firstWordLatency: number;
    voltage: number;
    timing: string;
}