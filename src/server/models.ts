
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
