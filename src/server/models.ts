
export const PCIeBracketColumns = [
    {name: 'ID', id: 'id', isRowHeader: true},
    {name: 'Name', id: 'name'},
]

export interface PCIeBracketRow {
    id: number;
    name: string;
}

export interface PCIeBracket {
    id: number;
    name: string;
}



export const PCIeSizeColumns = [
    {name: 'ID', id: 'id', isRowHeader: true},
    {name: 'Lane count', id: 'laneCount'},
]

export interface PCIeSizeRow {
    id: number;
    laneCount: number;
}

export interface PCIeSize {
    id: number;
    laneCount: number;
}



export const PCIeVersionColumns = [
    {name: 'ID', id: 'id', isRowHeader: true},
    {name: 'Version', id: 'name'},
]

export interface PCIeVersionRow {
    id: number;
    name: string;
}

export interface PCIeVersion {
    id: number;
    name: string;
}

export const PCIeSlotColumns = [
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

export interface PCIeSlotParams {
    sizes: PCIeSize[];
    versions: PCIeVersion[];
}