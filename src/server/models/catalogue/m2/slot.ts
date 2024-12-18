import { Pcie } from "..";
import {FormFactorDto, KeyDto, KeyDtoSimple} from '.'

export interface SlotListItem {
    id: number;
    keyName: string;
    laneSize: string;
    version: string;
    formFactors: string;
}

export interface SlotParams {
    keys: KeyDtoSimple[];
    formFactors: FormFactorDto[];
    versions: Pcie.VersionDto[];
    laneSizes: Pcie.SizeDto[];
}

export interface SlotDtoSimple {
    id: number;
    name: string;
}

export interface SlotDto {
    id: number;
    key: KeyDto;
    laneSize: Pcie.SizeDto;
    version: Pcie.VersionDto;
    formFactors: FormFactorDto[];
}

export interface SlotDbo {
    keyId: number;
    laneSizeId: number;
    versionId: number;
    formFactorIds: number[];
}
