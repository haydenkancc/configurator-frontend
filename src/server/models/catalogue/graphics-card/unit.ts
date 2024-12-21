import { General, Pcie, Memory, PowerSupply } from '..';
import {ChipsetDto, ConfigurationDbo, ConfigurationDto} from '.'
import {TableColumn} from '@/server/models';

export const UnitColumns : TableColumn[] = [
    {name: 'Name', id: 'name', isRowHeader: true, size: 'medium'},
    {name: 'Chipset', id: 'chipset', size: 'small'},
    {name: 'Memory', id: 'memoryCapacity', size: 'small'},
    {name: 'Core clock', id: 'coreClock', size: 'small'},
    {name: 'Boost clock', id: 'boostClock', size: 'small'},
    {name: 'Length', id: 'length', size: 'small'},
    {name: 'Colour', id: 'colour', size: 'small'},
    {name: 'Price', id: 'price', size: 'small'},
]


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
    chipsetID: number;
    memoryTypeID: number;
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