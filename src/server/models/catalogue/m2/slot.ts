import { Pcie } from "..";
import {FormFactorDto, KeyDto, KeyDtoSimple} from '.'
import {TableColumn} from '@/server/models';

export const SlotColumns: TableColumn[] = [
    {name: 'ID', id: 'id', isRowHeader: true},
    {name: 'Key', id: 'keyName'},
    {name: 'Form factors', id: 'formFactors', size: 'medium'},
    {name: 'Lane size', id: 'laneSize', size: 'small'},
    {name: 'Version', id: 'version', size: 'small'},
]

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
    keyID: number;
    laneSizeID: number;
    versionID: number;
    formFactorIDs: number[];
}
