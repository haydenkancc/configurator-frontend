import { General } from '..';
import {
    ConnectorDtoSimple,
    EfficiencyRatingDto,
    FormFactorDto,
    ModularityDto,
    UnitConnectorDbo,
    UnitConnectorDto
} from '.';
import {TableColumn} from '@/server/models';

export const UnitColumns: TableColumn[] = [
    {name: 'Name', id: 'name', isRowHeader: true, size: 'large'},
    {name: 'Form factor', id: 'formFactor', size: 'small'},
    {name: 'Efficiency rating', id: 'efficiencyRating', size: 'small'},
    {name: 'Wattage', id: 'totalPower', size: 'small'},
    {name: 'Modularity', id: 'modularity', size: 'small'},
    {name: 'Colour', id: 'colour', size: 'small'},
    {name: 'Price', id: 'price', size: 'small'},
]

export interface UnitListItem extends General.ComponentListItem {
    formFactor: string;
    efficiencyRating: string;
    totalPower: string;
    modularity: string;
}

export interface UnitParams {
    component: General.ComponentParams;
    connectors: ConnectorDtoSimple[];
    formFactors: FormFactorDto[];
    efficiencyRatings: EfficiencyRatingDto[];
    modularities: ModularityDto[];
}

export interface UnitDto {
    component: General.ComponentDto;
    formFactor: FormFactorDto;
    efficiencyRating: EfficiencyRatingDto;
    modularity: ModularityDto;
    connectors: UnitConnectorDto[];
    totalPower: number;
    length: number;
    fanless: boolean;
}

export interface UnitDbo {
    component: General.ComponentDbo;
    connectors: UnitConnectorDbo[];
    formFactorID: number;
    modularityID: number;
    efficiencyRatingID: number;
    totalPower: number;
    length: number;
    fanless: boolean;
}