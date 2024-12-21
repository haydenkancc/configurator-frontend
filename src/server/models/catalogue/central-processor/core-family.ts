import { MicroarchitectureDto } from ".";
import {TableColumn} from '@/server/models';

export const CoreFamilyColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Core Family', id: 'name', size: 'medium'},
    { name: 'Microarchitecture', id: 'microarchitecture', size: 'medium'},
    { name: '', id: 'SPACER'},
]


export interface CoreFamilyListItem {
    id: number;
    name: string;
    microarchitecture: string;
}

export interface CoreFamilyParams {
    microarchitectures: MicroarchitectureDto[];
}

export interface CoreFamilyDtoSimple {
    id: number;
    name: string;
}

export interface CoreFamilyDto {
    id: number;
    codeName: string;
    alternateName: string;
    microarchitecture: MicroarchitectureDto;
}

export interface CoreFamilyDbo {
    codeName: string;
    alternateName: string;
    microarchitectureID: number;
}