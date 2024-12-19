import { MicroarchitectureDto } from ".";

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