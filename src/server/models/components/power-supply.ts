import {TableColumn} from '@/server/models';
import {
    Component,
    ComponentDbo,
    ComponentParams,
    IComponent,
    IComponentDbo,
    IComponentParams
} from '@/server/models/components/index';

export const PowerSupplyConnectorColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Connector', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface PowerSupplyConnectorRow {
    id: number;
    name: string;
}

export interface PowerSupplyConnector extends PowerSupplyConnectorBase {
    compatibleConnectors: PowerSupplyConnectorBase[];
}

export interface PowerSupplyConnectorBase {
    id: number;
    name: string;
}

export interface PowerSupplyConnectorDbo {
    name: string;
    compatibleConnectorIDs: number[];
}

export interface PowerSupplyConnectorParams {
    connectors: PowerSupplyConnectorBase[];
}


export const PowerSupplyFormFactorColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Form Factor', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface PowerSupplyFormFactorRow {
    id: number;
    name: string;
}

export interface PowerSupplyFormFactor {
    id: number;
    name: string;
}

export interface PowerSupplyFormFactorDbo {
    name: string;
}

export const PowerSupplyEfficiencyRatingColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Efficiency Rating', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface PowerSupplyEfficiencyRatingRow {
    id: number;
    name: string;
}

export interface PowerSupplyEfficiencyRating {
    id: number;
    name: string;
}

export interface PowerSupplyEfficiencyRatingDbo {
    name: string;
}

export const PowerSupplyModularityColumns: TableColumn[] = [
    {name: 'ID', id: 'id', isRowHeader: true},
    {name: 'Name', id: 'name'},
]

export interface PowerSupplyModularityRow {
    id: number;
    name: string;
}

export interface PowerSupplyModularity {
    id: number;
    name: string;
}

export interface PowerSupplyModularityDbo {
    name: string;
}

export const PowerSupplyUnitColumns: TableColumn[] = [
    {name: 'Name', id: 'name', isRowHeader: true, size: 'large'},
    {name: 'Form factor', id: 'formFactor', size: 'small'},
    {name: 'Efficiency rating', id: 'efficiencyRating', size: 'small'},
    {name: 'Wattage', id: 'totalPower', size: 'small'},
    {name: 'Modularity', id: 'modularity', size: 'small'},
    {name: 'Price', id: 'price', size: 'small'},
]

export interface PowerSupplyUnitRow {
    name: string;
    formFactor: string;
    efficiencyRating: string;
    totalPower: string;
    modularity: string;
    price: string;
}

export interface PowerSupplyUnit extends IComponent {
    formFactor: PowerSupplyFormFactor;
    efficiencyRating: PowerSupplyEfficiencyRating;
    modularity: PowerSupplyModularity;
    connectors: PowerSupplyUnitConnector[]
    totalPower: number;
    length: number;
    fanless: boolean;
}

export interface PowerSupplyUnitDbo extends IComponentDbo {
    formFactorID: number;
    efficiencyRatingID: number;
    modularityID: number;
    connectors: PowerSupplyUnitConnector[];
    totalPower: number;
    length: number;
    fanless: boolean;
}

export interface PowerSupplyUnitParams extends IComponentParams {
    connectors: PowerSupplyConnector[];
    modularities: PowerSupplyModularity[];
    efficiencyRatings: PowerSupplyEfficiencyRating[];
    formFactors: PowerSupplyFormFactor[];
}

export interface PowerSupplyUnitConnector {
    connectorID: number;
    connectorCount: number;
    splitCount: number;
}
