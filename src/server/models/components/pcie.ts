import {TableColumn} from '@/server/models';
import {
    Component,
    ComponentDbo,
    ComponentParams,
    IComponent,
    IComponentDbo,
    IComponentParams
} from '@/server/models/components';

export const PCIeBracketColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Bracket', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface PCIeBracketRow {
    id: number;
    name: string;
}

export interface PCIeBracket {
    id: number;
    name: string;
}

export interface PCIeBracketDbo {
    name: string;
}



export const PCIeSizeColumns: TableColumn[] = [
    {name: 'Lane count', id: 'laneCount', isRowHeader: true},
]

export interface PCIeSizeRow {
    id: number;
    laneCount: string;
}

export interface PCIeSize {
    laneCount: number;
}


export interface PCIeSizeDbo {
    laneCount: number;
}


export const PCIeVersionColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Version', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface PCIeVersionRow {
    id: number;
    name: string;
}

export interface PCIeVersion {
    id: number;
    name: string;
}

export interface PCIeVersionDbo {
    name: string;
}

export const PCIeSlotColumns: TableColumn[] = [
    {name: 'ID', id: 'id', isRowHeader: true},
    {name: 'Version', id: 'version' },
    {name: 'Slot size', id: 'slotSize' },
]

export interface PCIeSlotRow {
    id: number;
    version: string;
    slotSize: string;
}

export interface PCIeSlot {
    id: number;
    version: PCIeVersion;
    physicalSize: PCIeSize;
    laneSize: PCIeSize;
}

export interface PCIeSlotDbo {
    versionID: number;
    physicalSizeID: number;
    laneSizeID: number;
}

export interface PCIeSlotParams {
    sizes: PCIeSize[];
    versions: PCIeVersion[];
}

export interface PCIeSlotSimple {
    id: number;
    name: string;
}

export interface IPCIeExpansionCard {
    expansionCard: PCIeExpansionCard;
}
export interface PCIeExpansionCard extends IComponent {
    bracket: PCIeBracket;
    version: PCIeVersion;
    laneSize: PCIeSize;
    physicalSize: PCIeSize;
    expansionSlotWidth: number;
}

export interface IPCIeExpansionCardDbo {
    expansionCard: PCIeExpansionCardDbo;
}

export interface PCIeExpansionCardDbo extends IComponentDbo {
    bracketID: number;
    versionID: number;
    laneSizeID: number;
    physicalSizeID: number;
    expansionSlotWidth: number;
}

export interface IPCIeExpansionCardParams {
    expansionCard: PCIeExpansionCardParams;
}

export interface PCIeExpansionCardParams extends IComponentParams {
    brackets: PCIeBracket[];
    versions: PCIeVersion[];
    sizes: PCIeSize[];
}