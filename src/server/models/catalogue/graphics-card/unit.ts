import { General, Pcie, Memory, PowerSupply } from '..';
import {ChipsetDto, ConfigurationDbo, ConfigurationDto} from '.'

export interface UnitListItem {
    chipset: string;
    memoryCapacity: string;
    coreClock: string;
    boostClock: string;
    length: string;
}

export interface UnitDto {
    component: General.ComponentDto;
    expansionCard: Pcie.ExpansionCardDto;
    configurations: ConfigurationDto[];
    chipset: ChipsetDto;
    memoryType: Memory.TypeDto;
    length: number;
    width: number;
    height: number;
    totalSlotWidth: number;
    totalPower: number;
    recommendedPower: number;
    memoryCapacity: number;
    coreClock: number;
    boostClock: number;
}

export interface UnitParams {
    component: General.ComponentParams;
    expansionCard: Pcie.ExpansionCardParams;
    chipsets: ChipsetDto[];
    memoryTypes: Memory.TypeDto[];
    connectors: PowerSupply.ConnectorDtoSimple[];
}

export interface UnitDbo {
    component: General.ComponentDbo;
    expansionCard: Pcie.ExpansionCardDbo;
    chipsetId: number;
    memoryTypeId: number;
    memoryCapacity: number;
    length: number;
    width: number;
    height: number;
    totalSlotWidth: number;
    totalPower: number;
    recommendedPower: number;
    coreClock: number;
    boostClock: number;
    configurations: ConfigurationDbo[];
}