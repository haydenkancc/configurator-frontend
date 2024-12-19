import { Pcie } from '..';

export interface ExpansionSlotAreaDto {
    bracket: Pcie.BracketDto;
    slotCount: number;
    riserRequired: boolean;
}

export interface ExpansionSlotAreaDbo {
    bracketID: number;
    slotCount: number;
    riserRequired: boolean;
}