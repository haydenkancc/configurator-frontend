import {TableColumn} from '@/server/models';
import {
    IComponent,
    IComponentDbo,
    IComponentParams,
    PCIeBracket,
    PCIeSize,
    PCIeVersion
} from '@/server/models/components';

export const M2KeyColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Name', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface M2KeyRow {
    id: number;
    name: string;
}

export interface M2Key extends M2KeyBase {
    compatibleKeys: M2KeyBase[];
}

export interface M2KeyBase {
    id: number;
    name: string;
}

export interface M2KeyDbo {
    name: string;
    compatibleKeyIDs: number[];
}

export interface M2KeyParams {
    keys: M2KeyBase[];
}

export const M2FormFactorColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Name', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface M2FormFactorRow {
    id: number;
    name: string;
}

export interface M2FormFactor {
    id: number;
    name: string;
}

export interface M2FormFactorDbo {
    name: string;
}

export const M2SlotColumns: TableColumn[] = [
    {name: 'ID', id: 'id', isRowHeader: true},
    {name: 'Key', id: 'keyName'},
    {name: 'Form factors', id: 'formFactors', size: 'medium'},
    {name: 'Lane size', id: 'laneSize', size: 'small'},
    {name: 'Version', id: 'version', size: 'small'},
]

export interface M2SlotRow {
    id: number;
    keyName: string;
    formFactors: string;
    laneSize: string;
    version: string;
}

export interface M2Slot {
    id: number;
    key: M2KeyBase;
    formFactors: M2FormFactor[];
    laneSize: PCIeSize;
    version: PCIeVersion;
}

export interface M2SlotDbo {
    keyID: number;
    formFactorIDs: number[];
    laneSizeID: number;
    versionID: number;
}

export interface M2SlotParams {
    keys: M2KeyBase[];
    formFactors: M2FormFactor[];
    laneSizes: PCIeSize[];
    versions: PCIeVersion[];
}

export interface M2SlotSimple {
    id: number;
    name: string;
}

export interface IM2ExpansionCard {
    expansionCard: M2ExpansionCard;
}
export interface M2ExpansionCard extends IComponent {
    key: M2KeyBase;
    formFactor: M2FormFactor;
    version: PCIeVersion;
    laneSize: PCIeSize;
}

export interface IM2ExpansionCardDbo {
    expansionCard: M2ExpansionCardDbo;
}

export interface M2ExpansionCardDbo extends IComponentDbo {
    keyID: number;
    formFactorID: number;
    versionID: number;
    laneSizeID: number;
}

export interface IM2ExpansionCardParams {
    expansionCard: M2ExpansionCardParams;
}

export interface M2ExpansionCardParams extends IComponentParams {
    keys: M2Key[]
    formFactors: M2FormFactor[]
    laneSizes: PCIeSize[]
    versions: PCIeVersion[]
}