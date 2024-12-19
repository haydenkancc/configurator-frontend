import {FormFactorDto, KeyDtoSimple} from ".";
import { Pcie } from "..";


export interface ExpansionCardParams {
    keys: KeyDtoSimple[];
    formFactors: FormFactorDto[];
    laneSizes: Pcie.SizeDto[];
    versions: Pcie.VersionDto[];
}

export interface ExpansionCardDto {
    key: KeyDtoSimple;
    formFactor: FormFactorDto;
    version: Pcie.VersionDto;
    laneSize: Pcie.SizeDto;
}

export interface ExpansionCardDbo {
    keyID: number;
    formFactorID: number;
    versionID: number;
    laneSizeID: number;
}
